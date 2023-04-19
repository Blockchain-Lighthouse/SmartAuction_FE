import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import Link from 'next/link'

import ROUTE from '@/constants/route'
import { removeAccessTokenFromLocalStorage } from '@/features/auth/token'
import useLocalStorage from '@/features/auth/useLocalStorage'
import { getUserInfo } from '@/services/api/user'

import Text from '../Text/Text'

import * as S from './Header.styled'

const Header = () => {
  const { accessToken, setAccessToken } = useLocalStorage()
  const { data: user } = useQuery(['user'], () => getUserInfo(), {
    select: (data) => data.payload,
    enabled: !!accessToken,
    onError: () => {
      setAccessToken('')
      removeAccessTokenFromLocalStorage()
    },
  })

  const handleClickLogout = () => {
    setAccessToken('')
    removeAccessTokenFromLocalStorage()
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
        {accessToken ? (
          <S.UserInfoBlock>
            <S.User>
              <Link href={ROUTE.PROFILE}>
                <i className='ri-account-circle-fill' />
              </Link>
              <div>
                <Text size='2'>{user?.nickname}님, 안녕하세요!</Text>
                <Text size='1'>Balance: {Number(user?.balance).toFixed(3)} MATIC</Text>
              </div>
            </S.User>
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
      </S.AuthWrapper>
    </S.Header>
  )
}

export default Header
