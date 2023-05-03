import styled from '@emotion/styled'
import tw from 'twin.macro'

const Container = styled.div`
  ${tw`flex h-screen flex-col items-center justify-center bg-background text-gray-100`}
`

const Form = styled.form`
  ${tw`flex w-1/2 flex-col items-center justify-center gap-8 rounded-xl bg-zinc-800 px-8 py-12`}
`

const MnemonicBlockWrapper = styled.div`
  ${tw`flex w-full flex-col items-center justify-center gap-4`}
`

const MnemonicInputBlock = styled.div`
  ${tw`flex w-full items-center justify-center gap-4`}

  h2 {
    ${tw`w-24`}
  }

  input {
    ${tw`w-64 rounded-md bg-zinc-700 px-4 py-2 outline-none`}
  }
`

const PasswordInputWrapper = styled.div`
  ${tw`flex w-full items-center justify-center gap-4`}

  h2 {
    ${tw`w-24`}
  }
`

const Input = styled.input`
  ${tw`w-64 rounded-md bg-zinc-700 px-4 py-2 outline-none`}
`

const Button = styled.button`
  ${tw`flex w-96 justify-center rounded-lg bg-blue-500 px-4 py-2 text-white`}
`

export { Container, Form, MnemonicBlockWrapper, MnemonicInputBlock, PasswordInputWrapper, Input, Button }
