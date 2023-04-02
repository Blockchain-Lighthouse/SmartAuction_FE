import { AxiosError } from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'

import Subtitle from '@/components/common/Subtitle'
import Title from '@/components/common/Title'
import ROUTE from '@/constants/route'
import { signUp } from '@/services/api/user'

import * as S from './SignUpContainer.styled'

interface FormValues {
  email: string
  password: string
  passwordConfirm: string
}

const SignUpContainer = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>()
  const { push } = useRouter()

  const onSubmit = async ({ email, password }: FormValues) => {
    try {
      const { statusCode } = await signUp(email, password)
      if (statusCode === 201) {
        alert('회원가입이 완료되었습니다.')
        push(ROUTE.SIGN_IN)
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.data.message === 'USER EXIST') {
          alert('이미 존재하는 이메일입니다. 로그인을 시도해주세요.')
        }
      }
    }
  }

  return (
    <S.Container>
      <S.Form onSubmit={handleSubmit(onSubmit)}>
        <Title size='4'>회원가입</Title>
        <label>
          <Subtitle size='4'>이메일</Subtitle>
          <input
            type='text'
            placeholder='이메일을 입력해주세요.'
            {...register('email', {
              required: {
                value: true,
                message: '이메일을 입력해주세요.',
              },
              pattern: {
                value: /^([a-zA-Z0-9.]+)@([a-zA-Z0-9]+)\.([a-zA-Z]{2,})$/,
                message: '이메일 형식이 올바르지 않습니다.',
              },
            })}
          />
          <small role='alert'>{errors.email?.message}</small>
        </label>
        <label>
          <Subtitle size='4'>비밀번호</Subtitle>
          <input
            type='password'
            placeholder='비밀번호를 입력해주세요.'
            {...register('password', {
              required: {
                value: true,
                message: '비밀번호를 입력해주세요.',
              },
              minLength: {
                value: 6,
                message: '비밀번호는 6자 이상이어야 합니다.',
              },
              maxLength: {
                value: 20,
                message: '비밀번호는 20자 이하여야 합니다.',
              },
            })}
          />
          <small role='alert'>{errors.password?.message}</small>
        </label>
        <label>
          <Subtitle size='4'>비밀번호 확인</Subtitle>
          <input
            type='password'
            placeholder='비밀번호를 다시 입력해주세요.'
            {...register('passwordConfirm', {
              required: {
                value: true,
                message: '비밀번호를 다시 입력해주세요.',
              },
              minLength: {
                value: 6,
                message: '비밀번호는 6자 이상이어야 합니다.',
              },
              maxLength: {
                value: 20,
                message: '비밀번호는 20자 이하여야 합니다.',
              },
              validate: (value) => value === watch('password') || '비밀번호가 일치하지 않습니다.',
            })}
          />
          <small role='alert'>{errors.passwordConfirm?.message}</small>
        </label>
        <S.Button type='submit'>회원가입</S.Button>
        <S.LinkWrapper>
          이미 계정이 있으신가요? <Link href={ROUTE.SIGN_IN}>로그인</Link>
        </S.LinkWrapper>
      </S.Form>
    </S.Container>
  )
}

export default SignUpContainer