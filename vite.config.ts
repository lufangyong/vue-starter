/// <reference types="vitest" />

import path from 'path'
import type { ConfigEnv, UserConfigExport } from 'vite'

import { createVitePlugins } from './build/plugin'

export default ({ command }: ConfigEnv): UserConfigExport => {
  const isBuild = command === 'build'

  return {
    resolve: {
      alias: {
        'vue-i18n': 'vue-i18n/dist/vue-i18n.cjs.js',
        '~/': `${path.resolve(__dirname, 'src')}/`,
        '/@/': `${path.resolve(__dirname, 'src')}/`,
        '/#/': `${path.resolve(__dirname, 'types')}/`,
      },
    },
    server: {
      https: false,
      host: true,
      port: 3333,
      proxy: {},
    },
    plugins: createVitePlugins(isBuild),

    // https://github.com/vitest-dev/vitest
    test: {
      environment: 'jsdom',
    },
  }
}
