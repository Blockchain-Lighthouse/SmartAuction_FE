import styled from '@emotion/styled'
import tw from 'twin.macro'

import type { AuctionStatus } from '@/services/api/auction/types'

export const Container = styled.div`
  ${tw`mx-auto flex h-full w-full max-w-screen-2xl flex-col items-center justify-center gap-4 py-12 px-4 text-gray-100`}

  h1 {
    ${tw`mb-12 text-4xl`}
  }

  a {
    ${tw`flex w-full justify-end`}
  }
`

export const Button = styled.button`
  ${tw`ml-auto flex gap-2 rounded-md bg-blue-500 px-4 py-2 text-xl`}
`

export const AuctionWrapper = styled.div`
  ${tw`grid w-full grid-cols-3 gap-8 rounded-md py-4 text-gray-100`}
`

export const AuctionBlock = styled.div`
  ${tw`flex w-full flex-col rounded-lg border border-zinc-700`}

  img {
    ${tw`rounded-t-lg`}
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`

export const Description = styled.div`
  ${tw`flex flex-col justify-between gap-4 border-b-zinc-800 border-b-2 p-4`}

  div {
    ${tw`flex items-center justify-between`}
  }
`

export const Status = styled.span<{ status: AuctionStatus }>`
  ${tw`rounded-md p-2 text-xl text-zinc-800`}
  ${({ status }) => {
    switch (status) {
      case 1:
        return tw`bg-green-200`
      case 2:
        return tw`bg-green-200`
      case 3:
        return tw`bg-red-200`
      case 4:
        return tw`bg-red-200`
      case 5:
        return tw`bg-zinc-700 text-gray-100`
      default:
        return tw`bg-zinc-700 text-gray-100`
    }
  }}
`
