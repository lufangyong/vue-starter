<script setup lang="ts">
import { useI18n } from '/@/hooks/web/useI18n'
import { useLocale } from '/@/locales/useLocale'
const { t } = useI18n()
const { changeLocale } = useLocale()
</script>

<template>
  <div>
    <CountTo :start-val="10" :end-val="2023" />
    <h1> {{ t('routes.basic.home') }}</h1>
    <button class="m-3 text-sm btn" @click="changeLocale('zh_CN')">
      zh
    </button>
    <button class="m-3 text-sm btn" @click="changeLocale('en')">
      en
    </button>
  </div>
</template>

<style lang="less">
</style>
