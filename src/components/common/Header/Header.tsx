import { useContext } from 'react'

import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import Link from 'next/link'

import Text from '@/components/common/Text'
import ROUTE from '@/constants/route'
import { AuthContext } from '@/contexts/auth'
import {
  getAccessTokenFromLocalStorage,
  removeAccessTokenFromLocalStorage,
  removeRefreshTokenFromLocalStorage,
} from '@/features/auth/token'
import { getUserInfo } from '@/services/api/user'

import * as S from './Header.styled'

const Header = () => {
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext)
  const { data: user, isSuccess } = useQuery(['user'], () => getUserInfo(), {
    select: (data) => data.payload,
    enabled: !!getAccessTokenFromLocalStorage(),
    onError: () => {
      setIsLoggedIn(false)
    },
  })

  const handleClickLogout = () => {
    removeAccessTokenFromLocalStorage()
    removeRefreshTokenFromLocalStorage()
    setIsLoggedIn(false)
  }

  return (
    <S.Header>
      <Link href='/'>
        <Image
          src={'https://blockchain-lighthouse.s3.ap-northeast-2.amazonaws.com/common/logo_rm.png'}
          width={125}
          height={100}
          alt='logo'
        />
      </Link>
      <S.Nav>
        <Link href={ROUTE.AUCTION}>
          <S.NavItem>Auction</S.NavItem>
        </Link>
      </S.Nav>
      <S.AuthWrapper>
        {isLoggedIn ? (
          <S.UserInfoBlock>
            {isSuccess && (
              <S.User>
                <Link href={ROUTE.PROFILE}>
                  <i className='ri-account-circle-fill' />
                </Link>
                <div>
                  <Text size='2'>{user.nickname}님, 안녕하세요!</Text>
                  <Text size='1'>Balance: {Number(user.balance).toFixed(3)} BCH</Text>
                </div>
              </S.User>
            )}
            <S.Button onClick={handleClickLogout}>
              <i className='ri-logout-box-line'></i>
              <span>Log out</span>
            </S.Button>
          </S.UserInfoBlock>
        ) : (
          <>
            <Link href={ROUTE.SIGN_IN}>
              <S.Button>
                <i className='ri-login-box-line'></i>
                <span>Sign In</span>
              </S.Button>
            </Link>
            <Link href={ROUTE.SIGN_UP}>
              <S.Button>
                <i className='ri-user-add-line'></i>
                <span>Sign Up</span>
              </S.Button>
            </Link>
          </>
        )}
        <S.Anchor href='http://52.78.209.196:3000' target='_blank' rel='noreferrer'>
          <i className='ri-rss-fill' />
          <span>Blockchain Network</span>
        </S.Anchor>
      </S.AuthWrapper>
    </S.Header>
  )
}

export default Header
