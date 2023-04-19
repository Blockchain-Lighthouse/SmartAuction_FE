import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/router'

import Subtitle from '@/components/common/Subtitle'
import { getAuctionBidders } from '@/services/api/auction'

import * as S from './Bidders.styled'

interface Props {
  contract: string | undefined
}

const Bidders = ({ contract }: Props) => {
  const { id } = useRouter().query
  const { data: bidders, isInitialLoading } = useQuery(['bidders', id], () => getAuctionBidders(contract as string), {
    select: (data) => data?.payload.bidders,
    enabled: !!contract,
  })

  return (
    <S.BiddersBlock>
      <Subtitle size='4'>입찰기록</Subtitle>
      {!contract && <Subtitle>입찰 기록이 없습니다.</Subtitle>}
      {isInitialLoading
        ? new Array(5).fill(0).map((_, index) => (
            <S.SkeletonWrapper key={index}>
              <S.Skeleton width={374} />
              <S.Skeleton width={91} />
              <S.Skeleton width={74} />
            </S.SkeletonWrapper>
          ))
        : bidders?.map((bidder) => (
            <S.BidderInformation key={bidder.biddedAt}>
              <span>{bidder.bidder}</span>
              <span>{bidder.price} MATIC</span>
              <span>{new Date(Number(bidder.biddedAt) * 1000).toLocaleDateString()}</span>
            </S.BidderInformation>
          ))}
    </S.BiddersBlock>
  )
}

export default Bidders
