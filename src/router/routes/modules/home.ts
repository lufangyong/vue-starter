import type { RouteRecordRaw } from 'vue-router'

const homeRouter: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('/@/layout/index.vue'),
    redirect: '/home',
    children: [
      {
        path: '/home',
        name: 'home',
        component: () => import('/@/views/home/index.vue'),
        meta: {
          title: '首页',
        },
      },
    ],
  },
]

export default homeRouter
