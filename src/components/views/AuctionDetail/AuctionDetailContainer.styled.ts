import styled from '@emotion/styled'
import tw from 'twin.macro'

import Subtitle from '@/components/common/Subtitle/Subtitle'
import Title from '@/components/common/Title'

export const Container = styled.div`
  ${tw`flex w-full justify-center gap-16 py-12 text-gray-100`}
`

export const Wrapper = styled.div`
  ${tw`flex w-1/2 flex-col`}
`

export const TitleWrapper = styled.div`
  ${tw`mb-2 flex items-end justify-between border-zinc-700 border-b pb-4`}
`

export const AuctionTitle = styled.h1`
  ${tw`text-4xl`}
`

export const Writer = styled(Subtitle)`
  ${tw`items-end text-zinc-400`}
`

export const Description = styled.div`
  ${tw`mt-4 h-full w-full rounded-lg border border-zinc-700 bg-zinc-800 p-4 font-bold text-gray-100 text-xl`}
  min-height: 768px;
`

export const WriterWrapper = styled.div`
  ${tw`flex justify-between`}
`

export const AuctionInfo = styled.div`
  min-width: 621px;
`

export const AuctionTitleWrapper = styled.div`
  ${tw`mb-4 flex items-center justify-between`}
`

export const Menu = styled.div`
  ${tw`mb-4 flex h-fit flex-col gap-4 rounded-lg border border-zinc-700 bg-zinc-800 p-8`}
`

export const StatusTitle = styled(Title)`
  ${tw`text-3xl`}
`

export const RemainTime = styled(Title)`
  ${tw`text-green-200`}
`

export const PriceWrapper = styled.div`
  ${tw`flex justify-between border border-zinc-700 p-6`}
`

export const MenuButtonWrapper = styled.div`
  ${tw`flex items-center justify-between gap-4`}

  h2 {
    ${tw`w-36`}
  }
`

export const MenuButton = styled.button`
  ${tw`mt-4 rounded-md bg-blue-500 p-2 text-center text-xl`}
`
