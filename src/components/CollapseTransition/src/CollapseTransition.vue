<script setup lang="ts">
defineProps<{
  visible: boolean
}>()

const listeners = {
  // 元素由隐藏变为可见
  enter(el: HTMLElement) {
    el.style.height = 'auto' // 将高度设为auto，是为了获取该元素的计算高度
    const endHeight = window.getComputedStyle(el).height // 计算高度
    el.style.height = '0px' // 将高度再设置为0
    // eslint-disable-next-line no-unused-expressions
    el.offsetHeight // 强制重绘，重绘后再改变高度才会产生动画
    el.style.height = endHeight // 设置为计算高度
  },
  afterEnter(el: HTMLElement) {
    el.style.height = '' // 过渡进入之后，将高度恢复为null
  },
  // 元素由可见变为隐藏
  leave(el: HTMLElement) {
    el.style.height = window.getComputedStyle(el).height // 计算高度
    // eslint-disable-next-line no-unused-expressions
    el.offsetHeight // 强制重绘，重绘后再改变高度才会产生动画
    el.style.height = '0px' // 将高度设置为0
  },
  afterLeave(el: HTMLElement) {
    el.style.height = '' // 过渡离开之后，将高度恢复为null
  },
}
</script>

<template>
  <transition v-bind="listeners">
    <!-- 当visible的值发生改变时，过渡组件的监听器就会触发 -->
    <div v-show="visible" class="x-collapse-transition">
      <slot />
    </div>
  </transition>
</template>

<style lang="less">
  .x-collapse-transition {
    overflow: hidden;
    transition: height .3s ease-in-out;
  }
</style>
