import type { RouteRecordRaw } from 'vue-router'
import { LAYOUT } from '../constant'

const homeRouter: RouteRecordRaw[] = [
  {
    path: '/',
    component: LAYOUT,
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
