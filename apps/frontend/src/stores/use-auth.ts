import { useStorage } from '@vueuse/core'
import { useRouteQuery } from '@vueuse/router'
import { defineStore } from 'pinia'
import { computed, onMounted, ref, watchEffect } from 'vue'
import type { AuthProviderInfo } from '@greasify/pocketbase'

import { usePocketbase } from '@/stores/use-pocketbase'
import router from '@/router'

export const useAuth = defineStore('auth', () => {
  const pocketbase = usePocketbase()

  const storageAuthProvider = useStorage<AuthProviderInfo | null>(
    'auth-provider',
    null,
    localStorage,
    {
      serializer: {
        read: (v) => (v ? JSON.parse(v) : null),
        write: (v) => JSON.stringify(v)
      }
    }
  )

  const authProviders = ref<AuthProviderInfo[]>([])
  const codeQueryParams = useRouteQuery<string>('code')
  const stateQueryParam = useRouteQuery<string>('state')
  const isLoading = computed(
    () => codeQueryParams.value && stateQueryParam.value
  )

  watchEffect(async () => {
    if (
      pocketbase.pb.authStore.token ||
      !storageAuthProvider.value ||
      !isLoading.value
    ) {
      return
    }

    if (storageAuthProvider.value.state !== stateQueryParam.value) {
      window.location.href = '/'
      return
    }

    try {
      await pocketbase.pb
        .collection('users')
        .authWithOAuth2Code(
          storageAuthProvider.value.name,
          codeQueryParams.value,
          storageAuthProvider.value.codeVerifier,
          window.location.origin
        )
    } catch {
      router.push('/')
    }
  })

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
    storageAuthProvider.value = authProvider
    window.location.href = authProvider.authUrl + window.location.origin
  }

  function signOut() {
    pocketbase.pb.authStore.clear()
  }

  return {
    isLoading,
    authProviders,
    signIn,
    signOut
  }
})
