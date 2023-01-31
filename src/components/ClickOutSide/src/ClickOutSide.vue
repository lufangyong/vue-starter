<script lang="ts" setup>
import { onClickOutside } from '@vueuse/core'
// const emit = defineEmits(['mounted', 'clickOutside'])

defineOptions({
  name: 'ClickOutSide',
})

const wrap = ref<ElRef>()

onClickOutside(wrap, () => {
  // emit('clickOutside')
})

onMounted(() => {
  // emit('mounted')
  // console.log('a :>> ', 12)
})
</script>

<template>
  <div ref="wrap">
    123
    <slot />
  </div>
</template>
