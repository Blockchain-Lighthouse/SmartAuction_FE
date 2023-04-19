import styled from '@emotion/styled'
import tw from 'twin.macro'

export const Modal = styled.div`
  ${tw`fixed top-0 left-0 flex h-full w-full items-center justify-center bg-black bg-opacity-50`}
`

export const ModalWrapper = styled.div`
  ${tw`flex flex-col gap-4 rounded-lg bg-zinc-800 p-8 text-gray-100`}
  width: 512px;
`

export const CloseButton = styled.button`
  ${tw`self-end text-2xl text-gray-200`}
`

export const ModalForm = styled.form`
  ${tw`flex flex-col gap-4`}

  h2 {
    ${tw`ml-2`}
  }

  label {
    ${tw`mb-4 flex flex-col gap-2`}

    span {
      ${tw`text-sm text-red-400`}
    }
  }
`

export const ModalInput = styled.input`
  ${tw`mb-2 h-12 w-full rounded-md border border-zinc-700 bg-zinc-800 px-4 text-xl text-gray-100`}
  &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`

export const ModalButton = styled.button`
  ${tw`flex items-center justify-center gap-2 rounded-md bg-blue-500 px-4 py-2 text-xl text-gray-100`}

  &:disabled {
    ${tw`pointer-events-none bg-gray-500`}
  }
`
