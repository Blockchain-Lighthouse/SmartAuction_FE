import { useState } from 'react'

import { AxiosError } from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

import Subtitle from '@/components/common/Subtitle'
import Title from '@/components/common/Title'
import { useTimer } from '@/components/views/SignIn/LoginForm/LoginForm.hooks'
import * as S from '@/components/views/SignIn/LoginForm/LoginForm.styled'
import { emailNotVerifiedRole, walletNotRegisteredRole } from '@/components/views/SignIn/SignInContainer.constants'
import ROUTE from '@/constants/route'
import { setAccessTokenToLocalStorage, setRefreshTokenToLocalStorage } from '@/features/auth/token'
import { emailVerify, getUserInfo, resendEmailVerify, signIn } from '@/services/api/user'

interface FormValues {
  email: string
  password: string
  passwordConfirm: string
  verificationCode: number
}

interface Props {
  setSignInStateToGenerate: () => void
}

const LoginForm = ({ setSignInStateToGenerate }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    getValues,
  } = useForm<FormValues>()
  const { push } = useRouter()
  const [isRequiredEmailVerification, setIsRequiredEmailVerification] = useState(false)
  const { timeLeft, timerEnded, startTimer } = useTimer(180)

  const onSubmit = async ({ email, password }: FormValues) => {
    try {
      const {
        statusCode,
        payload: { acToken, rfToken },
      } = await signIn(email, password)
      if (statusCode === 201) {
        setAccessTokenToLocalStorage(acToken)
        setRefreshTokenToLocalStorage(rfToken)
        const {
          payload: { role },
        } = await getUserInfo()
        if (role === emailNotVerifiedRole) {
          setIsRequiredEmailVerification(true)
          toast.info('이메일로 인증번호가 전송되었습니다. 이메일 입력 칸 아래에 인증번호를 입력해주세요.')
          return
        }

        if (role === walletNotRegisteredRole) {
          setSignInStateToGenerate()
          return
        }

        push(ROUTE.AUCTION)
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        const message = error.response?.data.messsage
        if (message === 'USER NOT EXIST') {
          setError('email', {
            type: 'manual',
            message: '존재하지 않는 이메일입니다.',
          })
          return
        }
        if (message === 'PASSWORD NOT MATCH') {
          setError('password', {
            type: 'manual',
            message: '비밀번호가 일치하지 않습니다.',
          })
          return
        }

        setError('email', {
          type: 'manual',
          message,
        })
      }

      toast.error('알 수 없는 에러가 발생했습니다.')
    }
  }

  const handleClickVerifyEmail = async (code: number | null) => {
    if (!code) {
      setError('verificationCode', {
        type: 'manual',
        message: '인증번호를 입력해주세요.',
      })
      return
    }

    const { statusCode } = await emailVerify(code)
    if (statusCode === 201) {
      toast.success('이메일 인증이 완료되었습니다.')
      setSignInStateToGenerate()
    }
  }

  const handleClickResendEmail = async () => {
    const { statusCode } = await resendEmailVerify()
    if (statusCode === 201) {
      startTimer()
      toast.info('이메일로 인증번호가 전송되었습니다.')
    }
  }

  return (
    <S.Container>
      <S.Form onSubmit={handleSubmit(onSubmit)}>
        <Title size='4'>로그인</Title>
        <label>
          <Subtitle size='4'>이메일</Subtitle>
          <input
            type='text'
            placeholder='이메일을 입력해주세요.'
            readOnly={isRequiredEmailVerification}
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
          <small>{errors.email?.message}</small>
        </label>
        {isRequiredEmailVerification && (
          <S.VerificationCodeBlock>
            <S.VerificationCodeInputWrapper>
              <input
                type='number'
                placeholder='이메일 인증번호를 입력해주세요.'
                {...register('verificationCode', {
                  minLength: {
                    value: 6,
                    message: '이메일 인증번호는 6자리입니다.',
                  },
                })}
              />
              <button type='button' onClick={() => handleClickVerifyEmail(getValues('verificationCode'))}>
                확인
              </button>
            </S.VerificationCodeInputWrapper>
            <small>{errors.verificationCode?.message}</small>
            <S.ResendEmailWrapper>
              <span>이메일이 도착하지 않으셨나요?</span>
              <button type='button' disabled={!timerEnded} onClick={handleClickResendEmail}>
                {timerEnded ? '재전송' : timeLeft}
              </button>
            </S.ResendEmailWrapper>
          </S.VerificationCodeBlock>
        )}
        <label>
          <Subtitle size='4'>비밀번호</Subtitle>
          <input
            type='password'
            placeholder='비밀번호를 입력해주세요.'
            readOnly={isRequiredEmailVerification}
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
          <small>{errors.password?.message}</small>
        </label>
        <S.Button type='submit' disabled={isSubmitting || isRequiredEmailVerification}>
          로그인
        </S.Button>
        <S.LinkWrapper>
          계정이 없으신가요?<Link href={ROUTE.SIGN_UP}>회원가입</Link>
        </S.LinkWrapper>
      </S.Form>
    </S.Container>
  )
}

export default LoginForm
