import { useState } from 'react'

import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'

import Layout from '@/components/common/Layout/Layout'
import DecodeModal from '@/components/views/Profile/DecodeModal/DecodeModal'
import { Modal, ModalContext } from '@/components/views/Profile/ProfileContainer.contexts'
import * as S from '@/components/views/Profile/ProfileContainer.styled'
import { getStatusText } from '@/components/views/Profile/ProfileContainer.utils'
import ROUTE from '@/constants/route'
import { getBiddedAuctionApi, getFavorites, getMyAuction } from '@/services/api/auction'
import { Auction } from '@/services/api/auction/types'
import { getUserInfo } from '@/services/api/user'

const ProfileContainer = () => {
  const [MenuFlag, setMenuFlag] = useState(0)
  const [Content, setContent] = useState<Auction[]>([])
  const [modal, setModal] = useState<Modal>(null)
  const [privateKey, setPrivateKey] = useState<string>('')

  const { data: user, isSuccess } = useQuery(['user'], () => getUserInfo(), {
    select: (data) => data.payload,
  })

  // 관심목록
  const getMyFavorite = async () => {
    if (user) {
      const result = await getFavorites()
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
      const result = await getMyAuction(0, 0)
      setContent(result.payload.auctions)
      setMenuFlag(2)
    } else {
      console.log(`유저없음_에러처리`)
    }
  }

  // 입찰목록
  const getBiddedAuction = async () => {
    if (user) {
      const result = await getBiddedAuctionApi(0, 0)
      console.log(result)
      setContent(result.payload.auctions)
      setMenuFlag(3)
    } else {
      console.log(`유저없음_에러처리`)
    }
  }

  if (!isSuccess) {
    return null
  }

  return (
    <ModalContext.Provider
      value={{
        modal,
        setModal,
      }}
    >
      {modal === 'decode' && <DecodeModal setPrivateKey={setPrivateKey} />}
      <Layout>
        <S.Layout>
          {/* User Information Box */}
          <S.StyledTitle size='4'>프로필</S.StyledTitle>

          {user?.email && (
            <S.Table>
              <S.TableRow>
                <S.TableRowName size='4'>이메일</S.TableRowName>
                <span>{user.email}</span>
              </S.TableRow>
              <S.TableRow>
                <S.TableRowName size='4'>닉네임</S.TableRowName>
                <span>{user.nickname}</span>
              </S.TableRow>
              <S.TableRow>
                <S.TableRowName size='4'>지갑주소</S.TableRowName>
                <div
                  style={{
                    width: '90%',
                  }}
                >
                  <span>Public Key : {user.publicKey}</span>
                  <S.PrivateKeyBlock>
                    <span>Private Key : {privateKey || '******************************************'}</span>
                    <button onClick={() => setModal('decode')}>Private Key 확인</button>
                  </S.PrivateKeyBlock>
                </div>
              </S.TableRow>
              <S.TableRow>
                <S.TableRowName size='4'>잔액</S.TableRowName>
                <span>{user.balance} BCH</span>
              </S.TableRow>
              <S.TableRow>
                <S.TableRowName size='4'>가입일</S.TableRowName>
                <span>{user.registeredAt.split('T')[0]}</span>
              </S.TableRow>
            </S.Table>
          )}

          {/* User Board */}
          <S.StyledTitle>유저 보드</S.StyledTitle>

          <S.UserBoard>
            {/* 메뉴 */}
            <S.UserBoardMenu>
              <S.UserBoardMenuContent onClick={getMyFavorite}>관심목록</S.UserBoardMenuContent>
              <S.UserBoardMenuContent onClick={getAuction}>내 경매</S.UserBoardMenuContent>
              <S.UserBoardMenuContent onClick={getBiddedAuction}>입찰경매</S.UserBoardMenuContent>
            </S.UserBoardMenu>
            <S.ContentLayout>
              <S.ContentHeader>
                <div>번호</div>
                <div>제목</div>
                <div>상태</div>
                <div>등록일</div>
              </S.ContentHeader>
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
            </S.ContentLayout>
          </S.UserBoard>
        </S.Layout>
      </Layout>
    </ModalContext.Provider>
  )
}

export default ProfileContainer
