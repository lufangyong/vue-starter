/**
 * @name configAutoImportDeps
 * @description 按需加载，自动引入
 */
import AutoImport from 'unplugin-auto-import/vite'

export const configAutoImportDeps = () => {
  return AutoImport({

    imports: [
      'vue',
      'vue/macros',
      'vue-router',
      '@vueuse/core',
      'pinia',
    ],
    dts: 'types/auto-imports.d.ts',
    dirs: [],
    vueTemplate: true,
  })
}
