import * as vueuse from '@vueuse/core'
import { defineStore } from 'pinia'
import { onMounted, ref } from 'vue'
import type { AuthProviderInfo } from '@greasify/pocketbase'
import type { UsersResponse } from '@greasify/pocketbase/types'

import { usePocketbase } from '@/stores/use-pocketbase.js'

const jsonSerializer = {
  read: (value: string) => (value ? JSON.parse(value) : null),
  write: (value: unknown) => JSON.stringify(value)
}

export const useAuth = defineStore('auth', () => {
  const pocketbase = usePocketbase()

  const authProviders = ref<AuthProviderInfo[]>([])
  const activeAuthProvider = vueuse.useLocalStorage<AuthProviderInfo | null>(
    'auth-provider',
    null,
    { serializer: jsonSerializer }
  )

  const authData = vueuse.useLocalStorage<{
    token: string
    model: UsersResponse
  } | null>('pb_auth', null, { serializer: jsonSerializer })

  onMounted(async () => {
    try {
      const authMethods = await pocketbase.pb
        .collection('users')
        .listAuthMethods()

      authProviders.value = authMethods.authProviders
    } catch (err) {
      console.error(err)
    }
  })

  function signIn(authProvider: AuthProviderInfo) {
    activeAuthProvider.value = authProvider
    window.location.replace(
      authProvider.authUrl + window.location.origin + '/auth/callback'
    )
  }

  function signOut() {
    pocketbase.pb.authStore.clear()
  }

  function getUserId() {
    return authData.value!.model.id
  }

  return {
    authData,
    authProviders,
    activeAuthProvider,
    signIn,
    signOut,
    getUserId
  }
})
