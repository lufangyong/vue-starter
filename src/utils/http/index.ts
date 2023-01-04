import { useAxios } from '@vueuse/integrations/useAxios'
import axios from 'axios'
import type { HttpRequestConfig } from './types'
import { AxiosCanceler } from './axiosCancel'

const axiosCanceler = new AxiosCanceler()

// create an axios instance
const instance = axios.create({
  baseURL: '',
  withCredentials: false,
  timeout: 5000,
})

// request interceptor
instance.interceptors.request.use(
  (config: HttpRequestConfig) => {
    const { ignoreCancelToken = true } = config
    // const token = store.state.user.token;
    !ignoreCancelToken && axiosCanceler.addPending(config)

    // if (token) {
    //   // let each request carry token
    //   config.headers = {
    //     ...config.headers,
    //     Authorization: `Bearer ${token}`
    //   };
    // }

    return config
  },
  (error) => {
    // do something with request error
    return Promise.reject(error)
  },
)

// response interceptor
instance.interceptors.response.use(
  (response) => {
    const res = response.data

    response && axiosCanceler.removePending(response.config)

    return res
  },
  (error) => {
    return Promise.reject(error.message)
  },
)

/**
 * reactive useFetchApi
 */
export default function useAxiosApi<T = any, R = any>(url: string, config: HttpRequestConfig) {
  const { immediate = true } = config

  // return instance(url, config, immediate)
  return useAxios<T, R>(url, config, instance, {
    immediate,
  })
}
