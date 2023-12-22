import PocketBase, { AsyncAuthStore } from '@greasify/pocketbase'
import { defineStore } from 'pinia'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import type { TypedPocketBase } from '@greasify/pocketbase/types'

import { discrete } from './use-discrete.js'

export const usePocketbase = defineStore('pocketbase', () => {
  const url = import.meta.env.DEV
    ? window.location.origin
    : import.meta.env.VITE_POCKETBASE_URL

  const store = new AsyncAuthStore({
    save: async (serialized) => localStorage.setItem('pb_auth', serialized),
    initial: localStorage.getItem('pb_auth')!,
    clear: async () => localStorage.removeItem('pb_auth')
  })

  const router = useRouter()
  const pb = ref<TypedPocketBase>(new PocketBase(url, store))

  onMounted(() => {
    pb.value.authStore.onChange((token) => {
      router.push(token ? '/dashboard' : '/')
    })

    pb.value.beforeSend = (url, options) => {
      discrete.loadingBar.start()
      return { url, options }
    }

    pb.value.afterSend = (response, data) => {
      if (response.status !== 200) {
        discrete.loadingBar.error()
      } else {
        discrete.loadingBar.finish()
      }

      return data
    }
  })

  return {
    pb
  }
})
