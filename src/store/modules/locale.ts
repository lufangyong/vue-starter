import type { LocaleSetting, LocaleType } from '/#/config'
import { defineStore } from 'pinia'
import { store } from '/@/store'
import { LOCALE_KEY } from '/@/enums/cacheEnum'
import { createLocalStorage } from '/@/utils/cache'

const ls = createLocalStorage()

const lsLocaleSetting = (ls.get(LOCALE_KEY) || {}) as LocaleSetting

interface LocaleState {
  localInfo: LocaleSetting
}

export const useLocaleStore = defineStore({
  id: 'app-locale',
  state: (): LocaleState => ({
    localInfo: lsLocaleSetting,
  }),
  getters: {
    getLocale(): LocaleType {
      return this.localInfo?.locale ?? 'zh_CN'
    },
  },
  actions: {

    setLocaleInfo(info: Partial<LocaleSetting>) {
      this.localInfo = { ...this.localInfo, ...info }
      ls.set(LOCALE_KEY, this.localInfo)
    },

    initLocale() {
      this.setLocaleInfo({
        ...this.localInfo,
      })
    },
  },
})

export function useLocaleStoreWithOut() {
  return useLocaleStore(store)
}
