import * as vueuse from '@vueuse/core'
import { defineStore } from 'pinia'
import type { UsersResponse } from '@greasify/pocketbase/types'

import { jsonSerializer } from '@/helpers/json-serializer.js'

export const useUser = defineStore('user', () => {
  const authData = vueuse.useLocalStorage<{
    token: string
    model: UsersResponse
  } | null>('pb_auth', null, { serializer: jsonSerializer })

  function getUserId() {
    return authData.value?.model.id
  }

  return {
    authData,
    getUserId
  }
})
