import { useRequest } from '/@/utils/http'

/**
 * 获取用户信息
 * @returns UseAxiosReturn
 */
export function getUserinfo(params: Record<string, any>) {
  return useRequest<{ name: string }>({
    method: 'get',
    url: '/api/userinfo',
    params,
    // ignoreCancelToken: false,
    // immediate: false,
    // isReturnNativeResponse: true,
  })
}
