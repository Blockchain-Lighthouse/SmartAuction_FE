export const getStatusText = (status: number) => {
  switch (status) {
    case 1:
    case 2:
      return '경매 진행중'
    case 3:
      return '거래 중'
    case 4:
    case 5:
      return '경매 종료'
    default:
      return '경매 사고'
  }
}
