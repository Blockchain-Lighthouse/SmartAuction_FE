import Image from 'next/image'
import Link from 'next/link'

import ROUTE from '@/constants/route'

import * as S from './LandingHeader.styled'

interface Props {
  scrollToIndex: (index: number) => void
}

const LandingHeader = ({ scrollToIndex }: Props) => {
  return (
    <S.Header>
      <Image
        src={'https://blockchain-lighthouse.s3.ap-northeast-2.amazonaws.com/common/logo_rm.png'}
        width={125}
        height={100}
        alt='logo'
      />
      <S.Nav>
        <ul>
          <li onClick={() => scrollToIndex(0)}>
            <span>About</span>
          </li>
          <li onClick={() => scrollToIndex(1)}>
            <span>Description</span>
          </li>
          {/* <li onClick={() => scrollToIndex(2)}>
            <span>Event</span>
          </li> */}
          <li onClick={() => scrollToIndex(3)}>
            <span>Roadmap</span>
          </li>
        </ul>
      </S.Nav>
      <div />
      {/* <S.AuthWrapper>
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
      </S.AuthWrapper> */}
    </S.Header>
  )
}

export default LandingHeader
