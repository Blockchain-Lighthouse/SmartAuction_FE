import { useContext } from 'react'

import { AxiosError } from 'axios'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'

import Subtitle from '@/components/common/Subtitle'
import Title from '@/components/common/Title'
import * as S from '@/components/views/SignIn/MnemonicVerify/MnemonicVerify.styled'
import { pickRandomNumbers } from '@/components/views/SignIn/MnemonicVerify/MnemonicVerify.utils'
import { MnemonicContext } from '@/components/views/SignIn/SignInContainer.context'
import ROUTE from '@/constants/route'
import { verifyMnemonic } from '@/services/api/user'

interface FormValues {
  mnemonic0: string
  mnemonic1: string
  mnemonic2: string
  password: string
}

const MnemonicVerify = () => {
  const { push } = useRouter()
  const { register, handleSubmit } = useForm<FormValues>()
  const { mnemonic } = useContext(MnemonicContext)
  const randomNumbers = pickRandomNumbers(1, 12)

  const onSubmit = async ({ mnemonic0, mnemonic1, mnemonic2, password }: FormValues) => {
    if (!mnemonic) {
      throw new Error('mnemonic이 존재하지 않습니다.')
    }

    const selectedMnemonic = randomNumbers.map((number) => mnemonic.split(' ')[number]).join(' ')

    if (selectedMnemonic !== [mnemonic0, mnemonic1, mnemonic2].join(' ')) {
      alert('입력하신 단어가 mnemonic과 일치하지 않습니다.')
      return
    }

    try {
      const { statusCode } = await verifyMnemonic(mnemonic, password)
      if (statusCode === 201) {
        alert('지갑이 등록되었습니다.')
        push(ROUTE.HOME)
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        alert(error.response?.data.message)
      }
    }
  }

  return (
    <S.Container>
      <S.Form onSubmit={handleSubmit(onSubmit)}>
        <Title size='4'>Mnemonic과 로그인 시 입력했던 패스워드를 입력해주세요.</Title>
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
        <S.Button type='submit'>지갑 등록</S.Button>
      </S.Form>
    </S.Container>
  )
}

export default MnemonicVerify