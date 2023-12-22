import PocketBase, { AsyncAuthStore } from '@greasify/pocketbase'
import { defineStore } from 'pinia'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import type { TypedPocketBase } from '@greasify/pocketbase/types'

export const usePocketbase = defineStore('pocketbase', () => {
  const router = useRouter()
  const pb = ref<TypedPocketBase | null>(null)

  onMounted(() => {
    const store = new AsyncAuthStore({
      save: async (serialized) => localStorage.setItem('pb_auth', serialized),
      initial: localStorage.getItem('pb_auth')!,
      clear: async () => localStorage.removeItem('pb_auth')
    })

    const url = import.meta.env.DEV ? window.location.origin : import.meta.env.VITE_POCKETBASE_URL
    pb.value = new PocketBase(url, store) as TypedPocketBase
    pb.value.authStore.onChange((token) => {
      router.push(token ? '/dashboard' : '/')
    })
  })

  return {
    pb
  }
})
