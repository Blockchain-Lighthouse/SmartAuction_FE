import { useEffect, useState } from 'react'

import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'

import Layout from '@/components/common/Layout/Layout'
import Subtitle from '@/components/common/Subtitle/Subtitle'
import { AUCTION_STATUS } from '@/components/views/Auction/AuctionContainer.const'
import { Modal, ModalContext } from '@/components/views/AuctionDetail/AuctionDetailContainer.contexts'
import * as S from '@/components/views/AuctionDetail/AuctionDetailContainer.styled'
import Bidders from '@/components/views/AuctionDetail/Bidders'
import BidModal from '@/components/views/AuctionDetail/BidModal'
import Chat from '@/components/views/AuctionDetail/Chat'
import SignatureModal from '@/components/views/AuctionDetail/SignatureModal'
import WithdrawModal from '@/components/views/AuctionDetail/WithdrawModal'
import { getAccessTokenFromLocalStorage, isLoggedIn } from '@/features/auth/token'
import { getAuctionBidders, getAuctionDetail } from '@/services/api/auction'
import { getUserInfo } from '@/services/api/user'

import { getTimeLeftByExpiredDate } from './AuctionDetailContainer.utils'

const AuctionDetailContainer = () => {
  const { id } = useRouter().query

  const { data: auction } = useQuery(['auction', id], () => getAuctionDetail(Number(id)), {
    select: (data) => data.payload,
    enabled: !!id,
  })
  const { data: bidders } = useQuery(
    ['bidders', id],
    () => {
      if (!auction?.contract) {
        throw new Error('Auction contract is not defined')
      }
      return getAuctionBidders(auction?.contract)
    },
    {
      select: (data) => data?.payload.bidders,
      enabled: !!auction?.contract,
    }
  )
  const { data: user } = useQuery(['user'], () => getUserInfo(), {
    select: (data) => data.payload,
    enabled: !!getAccessTokenFromLocalStorage(),
  })

  const [modal, setModal] = useState<Modal>(null)
  const [remainingTime, setRemainingTime] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })

  const isChatAvailable =
    (auction?.status === 3 || auction?.status === 4) &&
    (auction?.writerEoa === user?.publicKey || bidders?.at(-1)?.bidder === user?.publicKey)

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (!auction?.expiredAt) {
        return
      }

      const { days, hours, minutes, seconds } = getTimeLeftByExpiredDate(auction?.expiredAt)

      setRemainingTime({ days, hours, minutes, seconds })
    }, 1000)
    return () => clearInterval(intervalId)
  }, [auction?.expiredAt])

  return (
    <ModalContext.Provider
      value={{
        modal,
        setModal,
      }}
    >
      {modal === 'bid' && <BidModal />}
      {modal === 'signature' && <SignatureModal writerEoa={auction?.writerEoa ?? ''} />}
      {modal === 'withdraw' && <WithdrawModal />}
      {/* {isChatAvailable && <Chat />} */}
      <Layout>
        <S.Container>
          <S.Wrapper>
            <S.TitleWrapper>
              <S.AuctionTitle>{auction?.title}</S.AuctionTitle>
              <S.Writer size='2'>작성자: {auction?.writerEmail}</S.Writer>
            </S.TitleWrapper>
            {/* TODO: remove as string */}
            <S.Description dangerouslySetInnerHTML={{ __html: auction?.description as string }} />
          </S.Wrapper>
          <S.AuctionInfo>
            <S.Menu>
              <S.AuctionTitleWrapper>
                <S.StatusTitle size='4'>{AUCTION_STATUS[auction?.status || 404]}</S.StatusTitle>
                {auction?.status && auction?.status <= 2 && (
                  <S.RemainTime size='1'>
                    경매 종료까지 {remainingTime.days}일 {remainingTime.hours}시간 {remainingTime.minutes}분{' '}
                    {remainingTime.seconds}초 남았습니다.
                  </S.RemainTime>
                )}
              </S.AuctionTitleWrapper>
              <S.PriceWrapper>
                <Subtitle size='4'>입찰시작가</Subtitle>
                <Subtitle>{auction?.minPrice} MATIC</Subtitle>
              </S.PriceWrapper>
              <S.PriceWrapper>
                <Subtitle size='4'>즉시낙찰가</Subtitle>
                <Subtitle> {auction?.maxPrice} MATIC</Subtitle>
              </S.PriceWrapper>
              {auction?.status && auction?.status <= 2 && auction.writerEoa !== user?.publicKey && (
                <S.MenuButton
                  onClick={() => {
                    if (!isLoggedIn) {
                      toast.info('로그인이 필요합니다.')
                      return
                    }
                    setModal('bid')
                  }}
                >
                  입찰하기
                </S.MenuButton>
              )}
              {auction?.status === 3 && bidders?.at(-1)?.bidder === user?.publicKey && (
                <S.MenuButton onClick={() => setModal('signature')}>서명하기</S.MenuButton>
              )}
              {auction?.status === 4 && auction.writerEoa === user?.publicKey && (
                <S.MenuButton onClick={() => setModal('withdraw')}>출금하기</S.MenuButton>
              )}
            </S.Menu>
            <Bidders contract={auction?.contract} />
          </S.AuctionInfo>
        </S.Container>
      </Layout>
    </ModalContext.Provider>
  )
}

export default AuctionDetailContainer
