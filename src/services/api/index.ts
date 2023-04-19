import axios, { AxiosError, AxiosRequestConfig } from 'axios'

import { getApiEndpoint } from '@/envs'
import {
  getAccessTokenFromLocalStorage,
  getRefreshTokenFromLocalStorage,
  removeAccessTokenFromLocalStorage,
  removeRefreshTokenFromLocalStorage,
  setAccessTokenToLocalStorage,
} from '@/features/auth/token'

export interface ServerResponse<T> {
  statusCode: number
  payload: T
}

const accessToken = getAccessTokenFromLocalStorage()

const _api = axios.create({
  baseURL: getApiEndpoint(),
  headers: {
    ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
  },
})

_api.interceptors.request.use(
  (config) => {
    // eslint-disable-next-line no-param-reassign
    config.headers.Authorization = `Bearer ${getAccessTokenFromLocalStorage()}`
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

type SubScribers = ((token: string) => void)[]

let isRefreshing = false
let refreshSubscribers: SubScribers = []

interface RegenerateAccessTokenByRefreshTokenResponse {
  payload: {
    acToken: string
    acTokenExpiresAt: number
  }
}

_api.interceptors.response.use(
  (response) => {
    return response
  },
  async (error) => {
    const {
      config,
      response: { status },
    } = error

    const originalRequest = config
    if (status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve) => {
          refreshSubscribers.push((_accessToken) => {
            originalRequest.headers.Authorization = `Bearer ${_accessToken}`
            resolve(_api(originalRequest))
          })
        })
      }

      originalRequest._retry = true
      isRefreshing = true

      return new Promise((resolve) => {
        axios
          .post<RegenerateAccessTokenByRefreshTokenResponse>(
            `${getApiEndpoint()}/users/refresh`,
            {},
            { headers: { Authorization: `Bearer ${getRefreshTokenFromLocalStorage()}` } }
          )
          .then(({ data }) => {
            const { acToken } = data.payload
            setAccessTokenToLocalStorage(acToken)
            originalRequest.headers.Authorization = `Bearer ${acToken}`
            refreshSubscribers.forEach((subscriber) => subscriber(acToken))
            refreshSubscribers = []
            resolve(_api(originalRequest))
          })
          .catch((_error: AxiosError) => {
            removeAccessTokenFromLocalStorage()
            removeRefreshTokenFromLocalStorage()
            return Promise.reject(_error)
          })
      })
        .catch((_error: AxiosError) => {
          return Promise.reject(_error)
        })
        .finally(() => {
          isRefreshing = false
        })
    }

    return Promise.reject(error)
  }
)

const api = {
  get: <T>(url: string, config?: AxiosRequestConfig) =>
    _api.get<ServerResponse<T>>(url, config).then((res) => res.data),
  post: <T>(url: string, payload?: object, config?: AxiosRequestConfig) =>
    _api.post<ServerResponse<T>>(url, payload, config).then((res) => res.data),
}

export default api
