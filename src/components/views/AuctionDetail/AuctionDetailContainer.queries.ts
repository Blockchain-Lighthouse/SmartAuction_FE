import { useState } from 'react'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'

import { getAccessTokenFromLocalStorage } from '@/features/auth/token'
import { getAuctionBidders, getAuctionDetail, getFavorites, updateFavorites } from '@/services/api/auction'

export const useAuctionDetail = () => {
  const {
    query: { id },
  } = useRouter()
  const { data: auction } = useQuery(['auction', id], () => getAuctionDetail(Number(id)), {
    select: (data) => data.payload,
    enabled: !!id,
  })
  const { data: bidders } = useQuery(
    ['bidders', id],
    () => {
      if (!auction?.contract) {
        throw new Error('Auction contract is not defined')
      }
      return getAuctionBidders(auction.contract)
    },
    {
      select: (data) => data?.payload.bidders,
      enabled: !!auction?.contract,
    }
  )

  return {
    auction,
    bidders,
  }
}

export const useFavorites = () => {
  const queryClient = useQueryClient()
  const {
    query: { id },
  } = useRouter()

  const [isFavorite, setIsFavorite] = useState(false)

  const { data: favorites } = useQuery(['favorites'], getFavorites, {
    select: (data) => data.payload.auctions,
    enabled: !!getAccessTokenFromLocalStorage(),
    onSuccess: (newFavorites) => {
      if (newFavorites?.find((favorite) => favorite.id === Number(id))) {
        setIsFavorite(true)
      } else {
        setIsFavorite(false)
      }
    },
  })

  const { mutate: updateFavoritesMutation } = useMutation(updateFavorites, {
    onSuccess: ({ payload: { isCreated } }) => {
      if (isCreated) {
        toast.success('즐겨찾기에 추가되었습니다.')
      } else {
        toast.success('즐겨찾기에서 삭제되었습니다.')
      }
      queryClient.invalidateQueries(['favorites'])
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        if (error.response?.data.statusCode === 403) {
          toast.error('로그인이 필요합니다.')
          return
        }
      }

      toast.error('즐겨찾기 추가에 실패했습니다.')
    },
  })

  return {
    isFavorite,
    favorites,
    updateFavoritesMutation,
  }
}
