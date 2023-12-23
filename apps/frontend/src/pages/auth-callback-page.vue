<script setup lang="ts">
import { NSpin } from 'naive-ui'
import { watchEffect } from 'vue'
import { useRouteQuery } from '@vueuse/router'
import { usePocketbase } from '@/stores/use-pocketbase'
import { useAuth } from '@/stores/use-auth.js'
import { useRouter } from 'vue-router'

const router = useRouter()
const auth = useAuth()
const pocketbase = usePocketbase()

const code = useRouteQuery<string>('code')
const state = useRouteQuery<string>('state')

watchEffect(async () => {
  if (
    pocketbase.pb.authStore.token ||
    !auth.activeAuthProvider ||
    !code.value ||
    !state.value
  ) {
    return
  }

  try {
    await pocketbase.pb
      .collection('users')
      .authWithOAuth2Code(
        auth.activeAuthProvider.name,
        code.value,
        auth.activeAuthProvider.codeVerifier,
        window.location.origin + '/auth/callback'
      )
  } catch (err) {
    console.error(err)
  }
})
</script>

<template>
  <n-spin />
</template>
