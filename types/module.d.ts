// declare module '*.vue' {
//   import { DefineComponent } from 'vue';
//   const Component: DefineComponent<{}, {}, any>;
//   export default Component;
// }

// declare module '*.vue' { // NOTE: ts-loader
//   import { defineComponent } from 'vue';

//   const component: ReturnType<typeof defineComponent>;
//   export default component;
// }

declare module '*.vue' {
  import { defineComponent } from 'vue'
  const component: ReturnType<typeof defineComponent>
  export default component
}
