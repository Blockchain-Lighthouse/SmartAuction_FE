import styled from '@emotion/styled'
import tw from 'twin.macro'

export const BiddersBlock = styled.div`
  ${tw`flex flex-col gap-4 rounded-lg border border-zinc-700 bg-zinc-800 p-6`}

  h2 {
    ${tw`mb-2`}
  }
`

export const SkeletonWrapper = styled.div`
  ${tw`flex animate-pulse gap-4 rounded-lg bg-zinc-800`}
`

export const Skeleton = styled.div<{ width: number }>`
  ${tw`h-6 rounded-lg bg-zinc-700`}
  width: ${({ width }) => width}px;
`

export const BidderInformation = styled.div`
  ${tw`flex items-center gap-4`}
`
