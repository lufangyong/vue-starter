<script setup lang="ts">
import { useI18n } from '/@/hooks/web/useI18n'
import { useLocale } from '/@/locales/useLocale'

defineOptions({
  name: 'IndexPage',
})

const { t } = useI18n()
const { changeLocale } = useLocale()

const changeLo = () => {
  changeLocale('en')
}

const changeLoZg = () => {
  changeLocale('zh_CN')
}
</script>

<template>
  <div>
    <div>测试翻译</div>
    <h2> {{ t('routes.basic.login') }}</h2>
    <button class="m-3 text-sm btn" @click="changeLoZg">
      zh
    </button>
    <button class="m-3 text-sm btn" @click="changeLo">
      en
    </button>
  </div>
</template>
