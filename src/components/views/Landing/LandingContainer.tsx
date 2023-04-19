import About from '@/components/views/Landing/About'
import Description from '@/components/views/Landing/Description'
import Event from '@/components/views/Landing/Event'
import useScroll from '@/components/views/Landing/hooks/useScroll'
import LandingHeader from '@/components/views/Landing/LandingHeader'
import Roadmap from '@/components/views/Landing/Roadmap'

import * as S from './Landing.styled'

const LandingContainer = () => {
  const { containerRef, scrollToIndex } = useScroll()

  return (
    <S.Layout>
      <LandingHeader scrollToIndex={scrollToIndex} />
      <S.ScrollBlock ref={containerRef}>
        <About />
        <Description />
        {/* <Event /> */}
        <Roadmap />
      </S.ScrollBlock>
    </S.Layout>
  )
}

export default LandingContainer
