import { Dispatch, SetStateAction, useContext, useState } from 'react'

import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { FieldErrors, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

import Subtitle from '@/components/common/Subtitle'
import * as S from '@/components/views/Profile/DecodeModal/DecodeModal.styled'
import { ModalContext } from '@/components/views/Profile/ProfileContainer.contexts'
import { decode } from '@/services/api/wallet'

interface FormValues {
  password: string
}

interface Props {
  setPrivateKey: Dispatch<SetStateAction<string>>
}

const DecodeModal = ({ setPrivateKey }: Props) => {
  const { register, handleSubmit, watch } = useForm<FormValues>()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { setModal } = useContext(ModalContext)

  const { mutate } = useMutation(() => decode(watch('password')), {
    onSuccess: (data) => {
      toast.success('복호화 되었습니다. Private Key를 확인해주세요.')
      setPrivateKey(data.payload.privateKey)
      setModal(null)
      setIsSubmitting(false)
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message)
        setIsSubmitting(false)
        return
      }

      toast.error('복호화에 실패했습니다.')
      setIsSubmitting(false)
    },
  })

  const onSumbit = () => {
    setIsSubmitting(true)
    mutate()
  }

  const onError = ({ password }: FieldErrors<FormValues>) => {
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
            <span>Private Key 복호화</span>
          </S.ModalButton>
        </S.ModalForm>
      </S.ModalWrapper>
    </S.Modal>
  )
}

export default DecodeModal
