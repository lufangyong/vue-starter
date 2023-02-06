import { useAxios } from '@vueuse/integrations/useAxios'
import type { AxiosInstance, AxiosRequestConfig, CustomParamsSerializer } from 'axios'
import axios from 'axios'
import { stringify } from 'qs'
import type { HttpInternalAxiosRequestConfig, HttpRequestConfig, HttpResponse } from './types'
import { AxiosCanceler } from './axiosCancel'

const axiosCanceler = new AxiosCanceler()

// 相关配置请参考：www.axios-js.com/zh-cn/docs/#axios-request-config-1
const defaultConfig: AxiosRequestConfig = {
  // 请求超时时间
  timeout: 10000,
  headers: {
    'Accept': 'application/json, text/plain, */*',
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
  },
  // 数组格式参数序列化（https://github.com/axios/axios/issues/5142）
  paramsSerializer: {
    serialize: stringify as unknown as CustomParamsSerializer,
  },
}

class Http {
  constructor() {
    this.httpInterceptorsRequest()
    this.httpInterceptorsResponse()
  }

  /** 保存当前Axios实例对象 */
  private static axiosInstance: AxiosInstance = axios.create(defaultConfig)

  /** 请求拦截 */
  private httpInterceptorsRequest(): void {
    Http.axiosInstance.interceptors.request.use(
      async (config: HttpInternalAxiosRequestConfig) => {
        const { ignoreCancelToken = true, isReturnNativeResponse = false } = config

        !ignoreCancelToken && axiosCanceler.addPending(config)
        config.isReturnNativeResponse = isReturnNativeResponse

        return config
      },
      (error) => {
        return Promise.reject(error)
      },
    )
  }

  /** 响应拦截 */
  private httpInterceptorsResponse(): void {
    const instance = Http.axiosInstance
    instance.interceptors.response.use(
      (response: HttpResponse) => {
        const res = response.config.isReturnNativeResponse ? response : response.data

        response && axiosCanceler.removePending(response.config)

        return res
      },
      (error) => {
        return Promise.reject(error)
      },
    )
  }

  /** 通用请求工具函数 */
  public request<T>(
    config: HttpRequestConfig,
  ): Promise<T> {
    // 单独处理自定义请求/响应回掉
    return new Promise((resolve, reject) => {
      Http.axiosInstance
        .request(config)
        .then((response: any) => {
          resolve(response)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  /** 单独抽离的post工具函数 */
  public post<T>(
    config: HttpRequestConfig,
  ): Promise<T> {
    return this.request<T>({
      method: 'post',
      ...config,
    })
  }

  /** 单独抽离的get工具函数 */
  public get<T>(
    config: HttpRequestConfig,
  ): Promise<T> {
    return this.request<T>({
      method: 'get',
      ...config,
    })
  }

  public useRequest<T = any, R = any>(config: HttpRequestConfig) {
    const { immediate = true, url = '' } = config

    return useAxios<T, R>(url, config, Http.axiosInstance, {
      immediate,
    })
  }
}

export const http = new Http()

export const request = http.request

/**
 * reactive useFetchApi
 */
export const useRequest = http.useRequest
