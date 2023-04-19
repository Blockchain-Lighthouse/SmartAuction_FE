import api from '@/services/api'
import { DecodeResponse } from '@/services/api/wallet/types'

export const signature = (auctionId: number, signMsg: string, password: string) => {
  return api.post(`/wallets/sign`, { auctionId, signMsg, password })
}

export const decode = (password: string) => {
  return api.post<DecodeResponse>(`/wallets/decode`, { password })
}
