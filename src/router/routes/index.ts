import type { RouteRecordRaw } from 'vue-router'

const modules: Record<string, any> = import.meta.glob('./modules/**/*.ts', {
  eager: true,
})
const routeModuleList: RouteRecordRaw[] = []

// 加入到路由集合中
Object.keys(modules).forEach((key) => {
  const mod = modules[key].default || {}
  const modList = Array.isArray(mod) ? [...mod] : [mod]
  routeModuleList.push(...modList)
})

// 根路由
export const RootRoute: RouteRecordRaw = {
  path: '/',
  name: 'Root',
  redirect: '/home',
  meta: {
    title: 'Root',
  },
}

export const basicRoutes = [
  RootRoute,
  ...routeModuleList,
]
