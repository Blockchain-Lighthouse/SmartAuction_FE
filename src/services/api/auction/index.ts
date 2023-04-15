import api from '@/services/api'
import { Auction, AuctionDetail, AuctionParams, Bidder, GetMyAuction } from '@/services/api/auction/types'

export const getAuctions = (page: number, limit: number) => {
  return api.get<{ auctions: Auction[]; total: number }>(`/auctions/${page}/${limit}`)
}

export const createAuction = ({ title, description, initPrice, maxPrice, ipfsUrl, expiredAt }: AuctionParams) => {
  return api.post('/auctions', {
    title,
    description,
    initPrice,
    maxPrice,
    ipfsUrl,
    expiredAt,
  })
}

export const getAuctionDetail = (id: number) => {
  return api.get<AuctionDetail>(`/auctions/${id}`)
}

export const bidAuction = (auctionId: number, password: string, bidAmount: number) => {
  return api.post(`/auctions/bid`, { auctionId, password, bidAmount })
}

export const getAuctionBidders = (contractAdrs: string) => {
  return api.post<{ bidders: Bidder[] }>(`/auctions/bidders`, { contractAdrs })
}

export const getMyAuction = (userId: number | undefined, page: number, limit: number) => {
  return api.get<GetMyAuction>(`/auctions/${userId}/${page}/${limit}`)
}

export const getBiddedAuctionApi = (userId: number | undefined, page: number, limit: number) => {
  return api.get<GetMyAuction>(`auctions/bids/${userId}/${page}/${limit}`)
}
