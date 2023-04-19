import api from '@/services/api'
import { User } from '@/types/common/auth'
import type { SignResponse, GenerateRandomMnemonicResponse } from './types'

export const generateRandomMnemonic = () => {
  return api.post<GenerateRandomMnemonicResponse>('/wallets/mnemonic')
}

export const verifyMnemonic = (mnemonic: string, password: string) => {
  return api.post('/wallets/mnemonic/verify', { mnemonic, password })
}

// SignMsg = 서명을 허용할 사람의 주소임 (ADMIN이 서명하는 경우 사용)
// 사고로인해 판매자 또는 입찰자에게 돈을 돌려줄 경우.
// 일반적으로는 경매에 구매자가 물건을 잘받았음을 서명함. 이떄는 아무 서명 메세지를 넣어도 괜찮으나,
// 판매자의 EOA Address를 넣는 것을 선호.
export const sign = (password: string, auctionId: number, signMsg: string) => {
  return api.post<SignResponse>('/wallets/sign', { password, auctionId, signMsg })
}
