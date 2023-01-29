import type { CreateStorageParams } from './storageCache'
import { createStorage as create } from './storageCache'

export type Options = Partial<CreateStorageParams>

export const DEFAULT_CACHE_TIME = null // 60 * 60 * 24 * 7

const createOptions = (storage: Storage, options: Options = {}): Options => {
  return {
    storage,
    prefixKey: 'FS_',
    ...options,
  }
}

export const WebStorage = create(createOptions(sessionStorage))

export const createStorage = (storage: Storage = sessionStorage, options: Options = {}) => {
  return create(createOptions(storage, options))
}

export const createSessionStorage = (options: Options = {}) => {
  return createStorage(sessionStorage, { ...options, timeout: DEFAULT_CACHE_TIME })
}

export const createLocalStorage = (options: Options = {}) => {
  return createStorage(localStorage, { ...options, timeout: DEFAULT_CACHE_TIME })
}

export default WebStorage
