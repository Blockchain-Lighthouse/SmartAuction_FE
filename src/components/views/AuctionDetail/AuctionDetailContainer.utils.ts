export const getTimeLeftByExpiredDate = (expiredDate: string) => {
  const now = new Date(Date.now() - 9 * 60 * 60 * 1000)

  const target = new Date(expiredDate)

  const diff = target.getTime() - now.getTime()

  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor(diff / (1000 * 60 * 60)) % 24
  const minutes = Math.floor((diff / (1000 * 60)) % 60)
  const seconds = Math.floor((diff / 1000) % 60)

  return { days, hours, minutes, seconds }
}
