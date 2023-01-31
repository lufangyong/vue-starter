import type { App } from 'vue'
import { ClickOutSide } from './ClickOutSide'

export function registerGlobComp(app: App) {
  app.use(ClickOutSide)
}
