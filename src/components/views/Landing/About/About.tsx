import Image from 'next/image'
import Link from 'next/link'

import SmartAuctionImage from '@/assets/images/smart-auction.png'
import ROUTE from '@/constants/route'

import * as S from './About.styled'

const About = () => {
  return (
    <S.Section>
      <S.Block>
        <h1>No Fraud, Trustless</h1>
        <strong>SecondHand Market</strong>
        <p>
          Smart Auction is a secondhand market service that is <br />
          free from fraud and trustless trade.
        </p>
        <Link href={ROUTE.AUCTION}>
          <button>Go Demo</button>
        </Link>
      </S.Block>
      <S.ImageWrapper>
        <Image src={SmartAuctionImage} width={924} height={1368} alt='trade' />
      </S.ImageWrapper>
    </S.Section>
  )
}

export default About
