import styled from '@emotion/styled'
import tw from 'twin.macro'

export const Header = styled.header`
  ${tw`fixed top-0 flex h-24 w-full items-center justify-between bg-black px-12 py-4 font-bold text-stone-100 text-lg`}
  font-family: 'Poppins';

  ul {
    ${tw`flex items-center gap-8`}

    li {
      cursor: pointer;
    }
  }
`

export const Nav = styled.div`
  ${tw`flex items-center gap-4`}
`

export const NavItem = styled.div`
  /* ${tw`flex items-center gap-2`} */
`
export const AuthWrapper = styled.div`
  ${tw`flex items-center gap-2`}
`

export const UserInfoBlock = styled.div`
  ${tw`flex items-center gap-2 text-white`}
`

export const User = styled.div`
  ${tw`mr-6 flex items-center gap-4`}

  i {
    ${tw`align-middle text-5xl`}
  }

  span {
    ${tw`text-xl`}
  }
`

export const Button = styled.button`
  ${tw`flex items-center gap-2 rounded-md bg-stone-600 px-4 py-2 text-sm text-stone-100`}
`
