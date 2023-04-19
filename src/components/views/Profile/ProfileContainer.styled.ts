import styled from '@emotion/styled'
import tw from 'twin.macro'

export const Layout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
`

export const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: 800;
  margin: 1.5rem 0;
`

export const Table = styled.div`
  border: 1px solid #111111;
  width: 50%;
`

export const TableRow = styled.div`
  padding: 15px;
  line-height: 2;
  border-bottom: 0.1px solid gray;
`

export const TableRowName = styled.div`
  font-weight: 600;
  /* background-color : blue; */
`

export const PrivateKeyBlock = styled.div`
  ${tw`flex items-center justify-between`}

  button {
    ${tw`rounded-md bg-blue-500 p-2 text-center text-xl`}
  }
`

export const UserBoard = styled.div`
  width: 50%;
`

export const UserBoardMenu = styled.div`
  display: flex;
  border: 1px solid gray;
  justify-content: space-around;
  font-size: 18px;
`

export const UserBoardMenuContent = styled.div`
  user-select: none;
  &:hover {
    font-weight: 700;
    cursor: pointer;
  }
`

export const ContentBox = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 0.1px solid lightgray;
  padding-bottom: 2px;
  user-select: none;
  &:hover {
    cursor: pointer;
    font-weight: 600;
  }
  & > div:nth-child(1) {
    width: 35px;
  }

  & > div:nth-child(2) {
    width: 200px;
  }

  & > div:nth-child(3) {
    width: 80px;
  }

  & > div:nth-child(4) {
    width: 82px;
  }
`

export const ContentRow = styled.div``
