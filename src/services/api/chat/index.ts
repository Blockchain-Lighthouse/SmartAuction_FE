import api from '@/services/api'

export const getChats = async (id: number) => {
  return api.get(`/chats/${id}`)
}
