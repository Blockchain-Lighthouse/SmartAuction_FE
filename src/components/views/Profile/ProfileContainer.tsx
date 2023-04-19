import { useState } from 'react'

import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'

import DecodeModal from '@/components/views/Profile/DecodeModal/DecodeModal'
import { Modal, ModalContext } from '@/components/views/Profile/ProfileContainer.contexts'
import * as S from '@/components/views/Profile/ProfileContainer.styled'
import { getStatusText } from '@/components/views/Profile/ProfileContainer.utils'
import ROUTE from '@/constants/route'
import { getBiddedAuctionApi, getMyAuction } from '@/services/api/auction'
import { Auction } from '@/services/api/auction/types'
import { getUserInfo, myFavoriteAuctions } from '@/services/api/user'

const MyContainer = () => {
  const [MenuFlag, setMenuFlag] = useState(0)
  const [Content, setContent] = useState<Auction[]>([])
  const [modal, setModal] = useState<Modal>(null)
  const [privateKey, setPrivateKey] = useState<string>('')

  const { data: user } = useQuery(['user'], () => getUserInfo(), {
    select: (data) => data.payload,
  })

  // 관심목록
  const getMyFavorite = async () => {
    if (user) {
      const result = await myFavoriteAuctions()
      setContent(result.payload.auctions)
      setMenuFlag(1)
      console.log(result)
    } else {
      console.log(`유저없음 에러처리`)
    }
  }

  // 내가 쓴 옥션
  const getAuction = async () => {
    if (user) {
      const result = await getMyAuction(user.id, 0, 0)
      setContent(result.payload.auctions)
      setMenuFlag(2)
    } else {
      console.log(`유저없음_에러처리`)
    }
  }

  // 입찰목록
  const getBiddedAuction = async () => {
    if (user) {
      const result = await getBiddedAuctionApi(user.id, 0, 0)
      console.log(result)
      setContent(result.payload.auctions)
      setMenuFlag(3)
    } else {
      console.log(`유저없음_에러처리`)
    }
  }

  return (
    <ModalContext.Provider
      value={{
        modal,
        setModal,
      }}
    >
      {modal === 'decode' && <DecodeModal setPrivateKey={setPrivateKey} />}
      <S.Layout>
        {/* User Information Box */}
        <S.Title>유저 프로필</S.Title>

        {user?.email && (
          <S.Table>
            <S.TableRow>
              <S.TableRowName>[ 이메일 ]</S.TableRowName>
              <span>{user.email}</span>
            </S.TableRow>
            <S.TableRow>
              <S.TableRowName>[ 닉네임 ]</S.TableRowName>
              <span>{user.nickname}</span>
            </S.TableRow>
            <S.TableRow>
              <S.TableRowName>[ 지갑주소 ]</S.TableRowName>
              <span>Public Key : {user.publicKey}</span>
              <S.PrivateKeyBlock>
                <span>Private Key : {privateKey || '******************************************'}</span>
                <button onClick={() => setModal('decode')}>Private Key 확인</button>
              </S.PrivateKeyBlock>
            </S.TableRow>
            <S.TableRow>
              <S.TableRowName>[ 잔액 ]</S.TableRowName>
              <span>{user.balance} Matic</span>
            </S.TableRow>
            <S.TableRow>
              <S.TableRowName>[ 가입일 ]</S.TableRowName>
              <span>{user.registeredAt.split('T')[0]}</span>
            </S.TableRow>
          </S.Table>
        )}

        {/* User Board */}
        <S.Title>유저 보드</S.Title>

        <S.UserBoard>
          {/* 메뉴 */}
          <S.UserBoardMenu>
            <S.UserBoardMenuContent onClick={getMyFavorite}>관심목록</S.UserBoardMenuContent>
            <S.UserBoardMenuContent onClick={getAuction}>내 경매</S.UserBoardMenuContent>
            <S.UserBoardMenuContent onClick={getBiddedAuction}>입찰경매</S.UserBoardMenuContent>
          </S.UserBoardMenu>

          {/* 여기 컨텐츠 (My Favorite) */}
          <div>
            {MenuFlag === 1 &&
              Content &&
              Content.map((item) => (
                <Link href={`${ROUTE.AUCTION}/${item.id}`} key={item.id}>
                  <S.ContentBox>
                    <div>{item.id}</div>
                    <div>{item.title}</div>
                    <div>{getStatusText(item.status)}</div>
                    <div>{item.createdAt.split('T')[0]}</div>
                  </S.ContentBox>
                </Link>
              ))}
          </div>

          {/* 여기 컨텐츠 (My Auction) */}
          <div>
            {MenuFlag === 2 &&
              Content &&
              Content.map((item) => (
                <Link href={`${ROUTE.AUCTION}/${item.id}`} key={item.id}>
                  <S.ContentBox>
                    <div>{item.id}</div>
                    <div>{item.title}</div>
                    <div>{getStatusText(item.status)}</div>
                    <div>{item.createdAt.split('T')[0]}</div>
                  </S.ContentBox>
                </Link>
              ))}
          </div>

          {/* 여기 컨텐츠 (Bidded) */}
          <div>
            {MenuFlag === 3 &&
              Content &&
              Content.map((item) => (
                <Link href={`${ROUTE.AUCTION}/${item.id}`} key={item.id}>
                  <S.ContentBox>
                    <div>{item.id}</div>
                    <div>{item.title}</div>
                    <div>{getStatusText(item.status)}</div>
                    <div>{item.createdAt.split('T')[0]}</div>
                  </S.ContentBox>
                </Link>
              ))}
          </div>
        </S.UserBoard>
      </S.Layout>
    </ModalContext.Provider>
  )
}

export default MyContainer
