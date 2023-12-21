import { useStorage } from '@vueuse/core'
import { useRouteQuery } from '@vueuse/router'
import { defineStore } from 'pinia'
import { computed, onMounted, ref, watchEffect } from 'vue'
import type { AuthProviderInfo } from '@greasify/pocketbase'

import { usePocketbase } from '@/stores/use-pocketbase'

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

  const authProvider = ref<AuthProviderInfo | null>(null)
  const codeQueryParams = useRouteQuery<string>('code')
  const stateQueryParam = useRouteQuery<string>('state')
  const isAuthenticated = computed(
    () => codeQueryParams.value && stateQueryParam.value
  )

  watchEffect(async () => {
    if (
      !pocketbase.pb ||
      pocketbase.pb.authStore.token ||
      !storageAuthProvider.value ||
      !codeQueryParams.value ||
      !stateQueryParam.value
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
    } catch (err) {
      console.error(err)
    }
  })

  onMounted(async () => {
    if (!pocketbase.pb) return

    const authMethods = await pocketbase.pb
      .collection('users')
      .listAuthMethods()

    const githubProvider = authMethods.authProviders[0]
    if (!githubProvider) {
      throw new Error('No GitHub provider found')
    }

    authProvider.value = authMethods.authProviders[0]
  })

  function signIn() {
    if (!authProvider.value) return
    storageAuthProvider.value = authProvider.value
    window.location.href = authProvider.value.authUrl + window.location.origin
  }

  function signOut() {
    if (!pocketbase.pb) return
    pocketbase.pb.authStore.clear()
  }

  return {
    isAuthenticated,
    signIn,
    signOut
  }
})
