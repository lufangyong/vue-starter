import useAxiosApi from '/@/utils/http'

/**
 * 获取用户信息
 * @returns UseAxiosReturn
 */
export function getUserinfo() {
  return useAxiosApi('/api/userinfo', {
    method: 'get',
    params: {},
    // ignoreCancelToken: true,
    // immediate: true,
  })
}
