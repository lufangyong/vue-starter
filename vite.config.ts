/// <reference types="vitest" />

import path from 'node:path'
import type { ConfigEnv, UserConfigExport } from 'vite'
import { loadEnv } from 'vite'
import { createVitePlugins } from './build/plugin'
import { createProxy } from './build/proxy'
import { wrapperEnv } from './build/utils'

export default ({ command, mode }: ConfigEnv): UserConfigExport => {
  const root = process.cwd()
  const env = loadEnv(mode, root)
  const viteEnv = wrapperEnv(env)
  const { VITE_PORT, VITE_PUBLIC_PATH, VITE_PROXY, VITE_DROP_CONSOLE } = viteEnv
  const isBuild = command === 'build'

  return {
    base: VITE_PUBLIC_PATH,
    resolve: {
      alias: {
        'vue-i18n': 'vue-i18n/dist/vue-i18n.cjs.js',
        '/@/': `${path.resolve(__dirname, 'src')}/`,
        '/#/': `${path.resolve(__dirname, 'types')}/`,
      },
    },
    server: {
      https: false,
      host: true,
      port: VITE_PORT,
      proxy: createProxy(VITE_PROXY),
    },
    esbuild: {
      pure: VITE_DROP_CONSOLE ? ['console.log', 'debugger'] : [],
    },
    plugins: createVitePlugins(isBuild),

    // https://github.com/vitest-dev/vitest
    test: {
      environment: 'jsdom',
    },
  }
}
