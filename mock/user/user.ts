import type { MockMethod } from 'vite-plugin-mock'

export default [
  {
    url: '/api/userinfo',
    timeout: 200,
    method: 'get',
    response: () => {
      return {
        code: '200',
        data: {
          name: 'tt',
        },
      }
    },
  },
] as MockMethod[]
