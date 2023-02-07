import type { App } from 'vue'
import { CountTo } from './CountTo'

export function registerGlobComp(app: App) {
  app.use(CountTo)
}
