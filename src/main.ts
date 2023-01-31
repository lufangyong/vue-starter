import { createApp } from 'vue'
import App from './App.vue'
import { setupStore } from '/@/store'
import { setupI18n } from '/@/locales/setupI18n'
import { setupRouter } from './router'
import { registerGlobComp } from '/@/components/registerGlobComp'
import { setupGlobDirectives } from '/@/directives'

import '@unocss/reset/tailwind.css'
import './styles/main.css'
import 'uno.css'

async function bootstrap() {
  const app = createApp(App)

  // 配置 store
  setupStore(app)

  // 注册全局组件
  registerGlobComp(app)

  // 多语言配置
  // 异步案例：语言文件可能从服务器端获取
  await setupI18n(app)

  // 配置路由
  setupRouter(app)

  // 注册全局指令
  setupGlobDirectives(app)

  app.mount('#app')
}

bootstrap()
