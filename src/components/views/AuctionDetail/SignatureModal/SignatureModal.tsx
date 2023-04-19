import { useContext, useState } from 'react'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { useRouter } from 'next/router'
import { FieldErrors, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

import Icon from '@/components/common/Icon'
import Subtitle from '@/components/common/Subtitle'
import { signature } from '@/services/api/wallet'

import { ModalContext } from '../AuctionDetailContainer.contexts'

import * as S from './SignatureModal.styled'

interface FormValues {
  publicKey: string
  password: string
}

interface Props {
  writerEoa: string
}

const SignatureModal = ({ writerEoa }: Props) => {
  const { id } = useRouter().query
  const queryClient = useQueryClient()
  const { register, handleSubmit, watch } = useForm<FormValues>()
  const { setModal } = useContext(ModalContext)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { mutate } = useMutation(() => signature(Number(id), writerEoa, watch('password')), {
    onSuccess: () => {
      toast.success('서명에 성공했습니다.')
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

      toast.error('서명에 실패했습니다.')
      setIsSubmitting(false)
    },
  })

  const onSumbit = () => {
    setIsSubmitting(true)
    mutate()
  }

  const onError = ({ publicKey, password }: FieldErrors<FormValues>) => {
    if (publicKey) {
      toast.error(publicKey.message)
      return
    }

    if (password) {
      toast.error(password.message)
    }
  }

  return (
    <S.Modal>
      <S.ModalWrapper>
        <S.CloseButton onClick={() => setModal(null)}>
          <i className='ri-close-line' />
        </S.CloseButton>
        <S.ModalForm onSubmit={handleSubmit(onSumbit, onError)}>
          <label>
            <Subtitle size='4'>출금자 </Subtitle>
            <S.ModalInput
              type='text'
              placeholder='Public Key를 입력해주세요.'
              {...register('publicKey', {
                required: 'Public Key를 입력해주세요.',
              })}
              value={writerEoa}
              readOnly
            />
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
                <span>서명 진행중...</span>
              </div>
            ) : (
              <span>서명하기</span>
            )}
          </S.ModalButton>
        </S.ModalForm>
      </S.ModalWrapper>
    </S.Modal>
  )
}

export default SignatureModal
