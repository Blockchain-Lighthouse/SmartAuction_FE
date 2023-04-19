import styled from '@emotion/styled'
import tw from 'twin.macro'

const Header = styled.header`
  ${tw`fixed flex h-24 w-full items-center justify-between bg-black px-12 py-4 font-bold text-stone-100 text-lg`}
  font-family: 'Poppins';

  ul {
    ${tw`flex items-center gap-8`}

    li {
      cursor: pointer;
    }
  }
`

const Nav = styled.div`
  ${tw`flex self-center`}
`

const AuthWrapper = styled.div`
  ${tw`flex items-center gap-2`}
`

const Button = styled.button`
  ${tw`flex items-center gap-2 rounded-md bg-stone-600 px-4 py-2 text-sm text-stone-100`}
`

export { Header, Nav, AuthWrapper, Button }
