import { useContext } from 'react'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { useRouter } from 'next/router'
import { FieldErrors, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

import Subtitle from '@/components/common/Subtitle'
import { bidAuction, getAuctionDetail } from '@/services/api/auction'

import { ModalContext } from '../AuctionDetailContainer.context'

import * as S from './BidModal.styled'

interface FormValues {
  password: string
  bidPrice: number
}

const BidModal = () => {
  const { id } = useRouter().query
  const queryClient = useQueryClient()
  const {
    register,
    handleSubmit,
    watch,
    formState: { isLoading },
  } = useForm<FormValues>()
  const { setModal } = useContext(ModalContext)
  const { data: auction } = useQuery(['auction', id], () => getAuctionDetail(Number(id)), {
    select: (data) => data.payload,
    enabled: !!id,
  })

  const { mutate } = useMutation(() => bidAuction(Number(id), watch('password'), Number(watch('bidPrice'))), {
    onSuccess: () => {
      toast.success('입찰에 성공했습니다.')

      queryClient.invalidateQueries(['auction', id])
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message)
        return
      }

      toast.error('입찰에 실패했습니다.')
    },
  })

  const onSumbit = () => {
    mutate()
  }

  const onError = ({ bidPrice, password }: FieldErrors<FormValues>) => {
    if (bidPrice) {
      toast.error(bidPrice.message)
      return
    }

    if (password) {
      toast.error(password.message)
    }
  }

  return (
    <S.Modal>
      <S.ModalWrapper>
        <i
          className='ri-close-line'
          onClick={() => {
            setModal(null)
          }}
        />
        <S.ModalForm onSubmit={handleSubmit(onSumbit, onError)}>
          <label>
            <Subtitle size='4'>입찰가</Subtitle>
            <S.ModalInput
              type='number'
              placeholder='입찰가를 입력해주세요.'
              step='0.001'
              {...register('bidPrice', {
                required: '입찰가를 입력해주세요.',
                min: {
                  value: auction?.minPrice as number,
                  message: '입찰가는 시작가보다 높아야 합니다.',
                },
                max: {
                  value: auction?.maxPrice as number,
                  message: '입찰가는 최대가보다 낮아야 합니다.',
                },
              })}
            />
            <span>입찰가가 최대가를 넘는 경우 즉시 낙찰됩니다.</span>
          </label>
          <label>
            <Subtitle size='4'>비밀번호</Subtitle>
            <S.ModalInput
              type='password'
              placeholder='비밀번호를 입력해주세요.'
              {...register('password', {
                required: '비밀번호를 입력해주세요.',
              })}
            />
          </label>
          <S.ModalButton type='submit' disabled={isLoading}>
            입찰하기
          </S.ModalButton>
        </S.ModalForm>
      </S.ModalWrapper>
    </S.Modal>
  )
}

export default BidModal