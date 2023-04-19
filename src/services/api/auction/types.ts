export type AuctionStatus = 1 | 2 | 3 | 4 | 5 | 6

export interface Auction {
  id: number
  title: string
  description: string // <div>IPHONE 파는데요 ~~<img src='www.navsv.com' /><div>
  writer: number
  status: AuctionStatus
  minPrice: number
  maxPrice: number
  contract: string // 0xD9168068DeABD93cbfdf1471a988029b627Ac3be
  ipfsUrl: string // ipfs://naskjldnaksjddfndksjfnkf
  createdAt: string
  expiredAt: string
  thumbnail: string
}

export interface AuctionDetail {
  title: string
  description: string
  writerEoa: string
  writerEmail: string
  status: AuctionStatus
  minPrice: number
  maxPrice: number
  ipfsUrl: string
  contract: string
  createdAt: string
  expiredAt: string
}

export interface AuctionParams {
  title: string
  description: string
  minPrice: number
  maxPrice: number
  ipfsUrl: string
  expiredAt: string
  thumbnail: string
}

export interface Bidder {
  bidder: string
  price: number
  biddedAt: string
}

export interface GetMyAuction {
  auctions: Auction[]
}
