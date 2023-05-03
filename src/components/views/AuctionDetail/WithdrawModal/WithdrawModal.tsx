import { useContext, useState } from 'react'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { useRouter } from 'next/router'
import { FieldErrors, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

import Icon from '@/components/common/Icon'
import Subtitle from '@/components/common/Subtitle'
import { withdrawBySeller } from '@/services/api/auction'

import { ModalContext } from '../AuctionDetailContainer.contexts'

import * as S from './WithdrawModal.styled'

interface FormValues {
  password: string
}

const BidModal = () => {
  const { id } = useRouter().query
  const queryClient = useQueryClient()
  const { register, handleSubmit, watch } = useForm<FormValues>()
  const { setModal } = useContext(ModalContext)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { mutate } = useMutation(() => withdrawBySeller(Number(id), watch('password')), {
    onSuccess: () => {
      toast.success('출금에 성공했습니다.')
      queryClient.invalidateQueries(['auction', id])
      setIsSubmitting(false)
      setModal(null)
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message)
        setIsSubmitting(false)
        return
      }

      toast.error('출금에 실패했습니다.')
      setIsSubmitting(false)
    },
  })

  const onSubmit = () => {
    setIsSubmitting(true)
    mutate()
  }

  const onError = ({ password }: FieldErrors<FormValues>) => {
    toast.error(password?.message)
  }

  return (
    <S.Modal>
      <S.ModalWrapper>
        <S.CloseButton onClick={() => setModal(null)}>
          <i className='ri-close-line' />
        </S.CloseButton>
        <S.ModalForm onSubmit={handleSubmit(onSubmit, onError)}>
          <label>
            <Subtitle size='4'>비밀번호</Subtitle>
            <S.ModalInput
              type='password'
              placeholder='비밀번호를 입력해주세요.'
              {...register('password', {
                required: '비밀번호를 입력해주세요.',
              })}
            />
            <span>출금 진행을 위해 비밀번호를 입력해주세요.</span>
          </label>
          <S.ModalButton type='submit' disabled={isSubmitting}>
            {isSubmitting ? (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                <Icon iconName='blocksWave' />
                <span>출금 진행중...</span>
              </div>
            ) : (
              <span>출금하기</span>
            )}
          </S.ModalButton>
        </S.ModalForm>
      </S.ModalWrapper>
    </S.Modal>
  )
}

export default BidModal
