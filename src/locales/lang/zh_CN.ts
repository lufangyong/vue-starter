import { genMessage } from '../helper'

const modules: Record<string, any> = import.meta.glob('./zh-CN/**/*.ts', {
  eager: true,
})
export default {
  message: {
    ...genMessage(modules, 'zh-CN'),
  },
}
