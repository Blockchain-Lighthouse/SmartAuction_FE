import styled from '@emotion/styled'
import tw from 'twin.macro'

const Section = styled.section`
  ${tw`flex flex-col items-center justify-center gap-24`}
  background-color: black;
  color: white;
`

const Title = styled.p`
  ${tw`text-center text-7xl text-stone-800`}
  font-weight: 700;
  background: linear-gradient(to right, #78cccf 30%, #5542cf 100%);
  background-clip: text;
  -webkit-text-fill-color: transparent;
`

const BlockWrapper = styled.div`
  ${tw`flex gap-12`}
`

const Block = styled.div`
  ${tw`flex flex-col items-start rounded-3xl border-stone-800 border border-solid p-12`}
  width: 400px;

  h1 {
    ${tw`font-bold text-4xl text-stone-100`}
  }

  p {
    ${tw`mt-4 text-lg text-stone-600`}
  }
`

const IconWrapper = styled.div`
  ${tw`mb-4 flex h-32 w-32 items-center justify-center rounded-3xl bg-stone-900 p-4 backdrop-blur-md backdrop-opacity-50`}

  i {
    ${tw`text-6xl`}
  }
`

export { Section, Title, BlockWrapper, Block, IconWrapper }
