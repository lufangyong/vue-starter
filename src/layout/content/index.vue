<script setup lang="ts">
import Footer from '../footer/index.vue'
import Header from '../header/index.vue'
</script>

<template>
  <div flex-1>
    <Header />
    <div m24px>
      <RouterView />
    </div>
    <Footer />
  </div>
</template>

<style scoped>

</style>
