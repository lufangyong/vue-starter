import Axios, {
  Method,
  AxiosError,
  AxiosResponse,
  AxiosRequestConfig,
  AxiosRequestHeaders
} from 'axios'

export type RequestMethods = Extract<
  Method,
  'get' | 'post' | 'put' | 'delete' | 'patch' | 'option' | 'head'
>

export interface HttpError extends AxiosError {
  response?: any
  isCancelRequest?: boolean
  config: HttpRequestConfig
}

export interface HttpResponse extends AxiosResponse {
  config: HttpRequestConfig
}

export interface HttpRequestConfig extends AxiosRequestConfig {
  /**
   * 是否忽略重复请求
   */
  ignoreCancelToken?: boolean
  /**
   * 是否显示错误信息
   */
  errorMessageShow?: boolean
  /**
   * 是否返回原生响应头 比如：需要获取响应头时使用该属性
   */
  isReturnNativeResponse?: boolean
}

export interface UseRequestConfig extends HttpRequestConfig {
  /**
   * 使用 useRequest 是否立即执行
   */
  immediate?: boolean
}

export interface HttpInternalAxiosRequestConfig extends HttpRequestConfig {
  headers: AxiosRequestHeaders
}
