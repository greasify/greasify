import { useStorage } from '@vueuse/core'
import { defineStore } from 'pinia'
import type { UsersResponse } from '@greasify/pocketbase/types'

export const useUser = defineStore('user', () => {
  const pocketbaseAuth = useStorage<{ token: string; model: UsersResponse }>(
    'pb_auth',
    null,
    localStorage,
    {
      serializer: {
        read: (v) => (v ? JSON.parse(v) : null),
        write: (v) => JSON.stringify(v)
      }
    }
  )

  return {
    pocketbaseAuth,
    userId: pocketbaseAuth.value.model.id
  }
})
