import PocketBase, { AsyncAuthStore } from '@greasify/pocketbase'
import { defineStore } from 'pinia'
import { onMounted, ref } from 'vue'
import type { TypedPocketBase } from '@greasify/pocketbase/types'

import { discrete } from './use-discrete.js'
import { useUser } from './use-user.js'
import { jsonSerializer } from '@/helpers/json-serializer.js'

const POCKETBASE_URL = import.meta.env.DEV
  ? window.location.origin
  : import.meta.env.VITE_POCKETBASE_URL

export const usePocketbase = defineStore('pocketbase', () => {
  const user = useUser()

  const store = new AsyncAuthStore({
    save: async (serialized) => user.authData = jsonSerializer.read(serialized),
    initial: jsonSerializer.write(user.authData),
    clear: async () => new Promise((resolve) => {
      user.authData = null
      resolve()
    })
  })

  const pb = ref<TypedPocketBase>(new PocketBase(POCKETBASE_URL, store))

  onMounted(() => {
    pb.value.beforeSend = (url, options) => {
      discrete.loadingBar.start()
      return { url, options }
    }

    pb.value.afterSend = (response, data) => {
      if (response.status >= 200 && response.status < 300) {
        discrete.loadingBar.finish()
      } else {
        discrete.loadingBar.error()
      }

      return data
    }
  })

  return {
    pb
  }
})
