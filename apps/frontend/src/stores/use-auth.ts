import * as vueuse from '@vueuse/core'
import { defineStore } from 'pinia'
import { onMounted, ref } from 'vue'
import type { AuthProviderInfo } from '@greasify/pocketbase'

import { usePocketbase } from '@/stores/use-pocketbase.js'
import { jsonSerializer } from '@/helpers/json-serializer.js'
import { useRouter } from 'vue-router'

export const useAuth = defineStore('auth', () => {
  const pocketbase = usePocketbase()
  const router = useRouter()

  const authProviders = ref<AuthProviderInfo[]>([])
  const activeAuthProvider = vueuse.useLocalStorage<AuthProviderInfo | null>(
    'auth-provider',
    null,
    { serializer: jsonSerializer }
  )

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
    router.push({ name: 'auth' })
  }

  return {
    authProviders,
    activeAuthProvider,
    signIn,
    signOut,
  }
})
