import type { PluginOption } from 'vite'
import Vue from '@vitejs/plugin-vue'
import Unocss from 'unocss/vite'
import VueMacros from 'unplugin-vue-macros/vite'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { configMockPlugin } from './mock'
import { configAutoImportDeps } from './autoImport'
import { configAutoRegistryComponents } from './component'
import { configVisualizerConfig } from './visualizer'

export function createVitePlugins(isBuild: boolean) {
  const vitePlugins: (PluginOption | PluginOption[])[] = [
    VueMacros({
      plugins: {
        vue: Vue({
          reactivityTransform: true,
        }),
      },
    }),
    vueJsx(),

    configAutoImportDeps(),

    // https://github.com/antfu/vite-plugin-components
    configAutoRegistryComponents(),

    // https://github.com/antfu/unocss
    // see unocss.config.ts for config
    Unocss(),

    // vite-plugin-mock
    configMockPlugin(isBuild),

    // rollup-plugin-visualizer
    configVisualizerConfig(),
  ]

  return vitePlugins
}
