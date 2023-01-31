/**
 * @name  AutoRegistryComponents
 * @description 按需加载，自动引入组件
 */
import Components from 'unplugin-vue-components/vite'

export const configAutoRegistryComponents = () => {
  return Components({
    dirs: [],
    dts: 'types/components.d.ts',
  })
}
