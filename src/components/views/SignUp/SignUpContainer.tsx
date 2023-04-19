import { AxiosError } from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

import Subtitle from '@/components/common/Subtitle'
import Title from '@/components/common/Title'
import ROUTE from '@/constants/route'
import { signUp } from '@/services/api/user'

import * as S from './SignUpContainer.styled'

interface FormValues {
  email: string
  nickname: string
  password: string
  passwordConfirm: string
}

const SignUpContainer = () => {
  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>()
  const { push } = useRouter()

  const onSubmit = async ({ email, nickname, password }: FormValues) => {
    try {
      const { statusCode } = await signUp(email, nickname, password)
      if (statusCode === 201) {
        toast.success('회원가입에 성공했습니다. 로그인을 시도해주세요.')
        push(ROUTE.SIGN_IN)
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.data.message === 'USER EXIST') {
          setError('email', { type: 'manual', message: '이미 존재하는 이메일입니다. 로그인을 시도해주세요.' })
          return
        }

        setError('email', { type: 'manual', message: error.response?.data.message })
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
          <Subtitle size='4'>닉네임</Subtitle>
          <input
            type='text'
            placeholder='닉네임을 입력해주세요.'
            {...register('nickname', {
              required: {
                value: true,
                message: '닉네임을 입력해주세요.',
              },
            })}
          />
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
        <S.Button type='submit' disabled={isSubmitting}>
          회원가입
        </S.Button>
        <S.LinkWrapper>
          이미 계정이 있으신가요? <Link href={ROUTE.SIGN_IN}>로그인</Link>
        </S.LinkWrapper>
      </S.Form>
    </S.Container>
  )
}

export default SignUpContainer
