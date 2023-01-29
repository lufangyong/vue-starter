import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import routes from 'virtual:generated-pages'
import App from './App.vue'
import { setupStore } from '/@/store'
import { setupI18n } from '/@/locales/setupI18n'

import '@unocss/reset/tailwind.css'
import './styles/main.css'
import 'uno.css'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})
// app.use(router)
// app.mount('#app')

async function bootstrap() {
  const app = createApp(App)
  app.use(router)
  // Configure store
  // 配置 store
  setupStore(app)

  // Register global components
  // 注册全局组件
  // registerGlobComp(app)

  // Multilingual configuration
  // 多语言配置
  // Asynchronous case: language files may be obtained from the server side
  // 异步案例：语言文件可能从服务器端获取
  await setupI18n(app)

  // Configure routing
  // 配置路由
  // setupRouter(app)

  // Register global directive
  // 注册全局指令
  // setupGlobDirectives(app)

  app.mount('#app')
}

bootstrap()
