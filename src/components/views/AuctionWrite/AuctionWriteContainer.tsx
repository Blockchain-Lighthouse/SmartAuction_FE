import { useLayoutEffect, useState } from 'react'

import dynamic from 'next/dynamic'
import Link from 'next/link'
import { useRouter } from 'next/router'
import DatePicker from 'react-datepicker'
import { FieldErrors, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

import Layout from '@/components/common/Layout'
import Subtitle from '@/components/common/Subtitle'
import * as S from '@/components/views/AuctionWrite/AuctionWriteContainer.styled'
import ROUTE from '@/constants/route'
import { isLoggedIn } from '@/features/auth/token'
import { createAuction } from '@/services/api/auction'

import 'react-datepicker/dist/react-datepicker.css'
import { getThumbnailFromHTML } from './AuctionWriteContainer.utils'

const ToastUIEditor = dynamic(() => import('@/components/common/ToastUIEditor'), {
  ssr: false,
})

interface FormValues {
  title: string
  minPrice: number
  maxPrice: number
  time: string
}

const AuctionWriteContainer = () => {
  const { register, handleSubmit, watch } = useForm<FormValues>()
  const { push } = useRouter()
  const [content, setContent] = useState('')
  const [endDate, setEndDate] = useState<Date | null>(new Date())

  const onSubmit = async ({ title, minPrice, maxPrice, time }: FormValues) => {
    if (!content) {
      toast.error('내용을 입력해주세요.')
      return
    }

    const { statusCode } = await createAuction({
      title,
      minPrice,
      maxPrice,
      description: content,
      ipfsUrl: '',
      expiredAt: `${endDate?.toISOString().slice(0, 10)}T${time}:00.000Z`,
      thumbnail: getThumbnailFromHTML(content),
    })
    if (statusCode === 201) {
      toast.success('경매 등록이 완료되었습니다.')
      push(ROUTE.AUCTION)
    }

    if (statusCode === 400) {
      toast.error('경매 등록에 실패하였습니다.')
    }
  }

  const onError = ({ title, minPrice, maxPrice }: FieldErrors<FormValues>) => {
    if (title?.message) {
      toast.error(title.message)
      return
    }

    if (minPrice?.message) {
      toast.error(minPrice.message)
      return
    }

    if (maxPrice?.message) {
      toast.error(maxPrice.message)
    }
  }

  useLayoutEffect(() => {
    if (!isLoggedIn()) {
      toast.error('로그인이 필요한 서비스입니다.')
      push(ROUTE.AUCTION)
    }
  }, [push])

  return (
    <Layout>
      <S.Container>
        <form onSubmit={handleSubmit(onSubmit, onError)}>
          <S.ButtonWrapper>
            <Link href={ROUTE.AUCTION}>
              <S.GoBackButton>
                <i className='ri-arrow-left-line'></i>
              </S.GoBackButton>
            </Link>
            <S.WriteButton type='submit'>
              <i className='ri-pencil-line'></i>
              <span>
                <Subtitle size='2'>경매 등록</Subtitle>
              </span>
            </S.WriteButton>
          </S.ButtonWrapper>
          <S.TitleInput
            placeholder='제목을 입력해주세요.'
            {...register('title', {
              required: '제목을 입력해주세요.',
              maxLength: {
                value: 20,
                message: '제목은 20자 이내로 입력해주세요.',
              },
            })}
          />
          <S.PriceWrapper>
            <label>
              <span>판매 시작가</span>
              <S.Input
                placeholder='판매 시작가를 입력해주세요.'
                type='number'
                step='0.1'
                {...register('minPrice', {
                  required: '판매 시작가를 입력해주세요.',
                  min: {
                    value: 0.1,
                    message: '판매 시작가는 0.1 이상이어야 합니다.',
                  },
                })}
              />
            </label>
            <label>
              <span>즉시 낙찰가</span>
              <S.Input
                placeholder='즉시 낙찰가를 입력해주세요.'
                type='number'
                step='0.1'
                {...register('maxPrice', {
                  required: '즉시 낙찰가를 입력해주세요.',
                  validate: (value) =>
                    Number(value) > watch('minPrice') || '즉시 낙찰가는 판매 시작가보다 높아야 합니다.',
                })}
              />
            </label>
            <S.DatePickerWrapper>
              <span>경매 종료 날짜</span>
              <DatePicker selected={endDate} onChange={(date) => setEndDate(date)} />
            </S.DatePickerWrapper>
            <S.DatePickerWrapper>
              <span>경매 종료 시간</span>
              <input
                type='time'
                {...register('time', {
                  required: '경매 종료 시간을 입력해주세요.',
                })}
              />
            </S.DatePickerWrapper>
          </S.PriceWrapper>
          <ToastUIEditor setContent={setContent} />
        </form>
      </S.Container>
    </Layout>
  )
}

export default AuctionWriteContainer
