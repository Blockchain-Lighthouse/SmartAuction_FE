export const getAccessTokenFromLocalStorage = () => {
  if (typeof window === 'undefined') {
    return null
  }

  return localStorage.getItem('acToken')
}

export const setAccessTokenToLocalStorage = (acToken: string) => {
  localStorage.setItem('acToken', acToken)
}

export const removeAccessTokenFromLocalStorage = () => {
  localStorage.removeItem('acToken')
}

export const getRefreshTokenFromLocalStorage = () => {
  return localStorage.getItem('rfToken')
}

export const setRefreshTokenToLocalStorage = (rfToken: string) => {
  localStorage.setItem('rfToken', rfToken)
}

export const removeRefreshTokenFromLocalStorage = () => {
  localStorage.removeItem('rfToken')
}

export const isLoggedIn = () => Boolean(getAccessTokenFromLocalStorage())
