import { useContext } from 'react'

import { AxiosError } from 'axios'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

import Icon from '@/components/common/Icon'
import Subtitle from '@/components/common/Subtitle'
import Title from '@/components/common/Title'
import * as S from '@/components/views/SignIn/MnemonicVerify/MnemonicVerify.styled'
import { pickRandomNumbers } from '@/components/views/SignIn/MnemonicVerify/MnemonicVerify.utils'
import { MnemonicContext } from '@/components/views/SignIn/SignInContainer.context'
import ROUTE from '@/constants/route'
import { AuthContext } from '@/contexts/auth'
import { verifyMnemonic } from '@/services/api/user'

interface FormValues {
  mnemonic0: string
  mnemonic1: string
  mnemonic2: string
  password: string
}

const MnemonicVerify = () => {
  const { push } = useRouter()
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<FormValues>()
  const { mnemonic } = useContext(MnemonicContext)
  const { setIsLoggedIn } = useContext(AuthContext)
  const randomNumbers = pickRandomNumbers(1, 11)

  const onSubmit = async ({ mnemonic0, mnemonic1, mnemonic2, password }: FormValues) => {
    if (!mnemonic) {
      throw new Error('mnemonic이 존재하지 않습니다.')
    }

    const selectedMnemonic = randomNumbers.map((number) => mnemonic.split(' ')[number]).join(' ')

    if (selectedMnemonic !== [mnemonic0, mnemonic1, mnemonic2].join(' ')) {
      toast.error('입력하신 단어가 mnemonic과 일치하지 않습니다.')
      return
    }

    try {
      const { statusCode } = await verifyMnemonic(mnemonic, password)
      if (statusCode === 201) {
        setIsLoggedIn(true)
        toast.success('지갑이 등록되었습니다.')
        push(ROUTE.AUCTION)
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message)
      }

      toast.error('지갑 등록에 실패했습니다.')
    }
  }

  return (
    <S.Container>
      <S.Form onSubmit={handleSubmit(onSubmit)}>
        <Title size='4'>Mnemonic 인증</Title>
        <Subtitle size='2'>지갑 등록을 위해 Mnemonic과 로그인 시 입력했던 패스워드를 입력해주세요.</Subtitle>
        <S.MnemonicBlockWrapper>
          {randomNumbers.map((number, index) => {
            const mnemonicIndex = `mnemonic${index}` as keyof FormValues
            return (
              <S.MnemonicInputBlock key={number}>
                <Subtitle size='2' key={number}>
                  {number + 1}번째 단어
                </Subtitle>
                <input
                  type='text'
                  placeholder=''
                  {...register(mnemonicIndex, {
                    required: true,
                  })}
                />
              </S.MnemonicInputBlock>
            )
          })}
        </S.MnemonicBlockWrapper>
        <S.PasswordInputWrapper>
          <Subtitle size='2'>비밀번호</Subtitle>
          <S.Input
            type='password'
            placeholder='비밀번호를 입력해주세요.'
            {...register('password', {
              required: true,
            })}
          />
        </S.PasswordInputWrapper>
        <S.Button type='submit' disabled={isSubmitting}>
          {isSubmitting ? (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <Icon iconName='blocksWave' />
              <span>지갑 등록중...</span>
            </div>
          ) : (
            <span>지갑 등록</span>
          )}
        </S.Button>
      </S.Form>
    </S.Container>
  )
}

export default MnemonicVerify
