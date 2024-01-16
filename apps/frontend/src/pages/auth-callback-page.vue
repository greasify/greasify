<script setup lang="ts">
import { NSpin } from 'naive-ui'
import { onMounted } from 'vue'
import { useRouteQuery } from '@vueuse/router'
import { usePocketbase } from '@/stores/use-pocketbase'
import { useAuth } from '@/stores/use-auth.js'

const auth = useAuth()
const pocketbase = usePocketbase()

const code = useRouteQuery<string>('code')
// const state = useRouteQuery<string>('state')

async function authWithProvider() {
  if (!auth.activeAuthProvider || !code.value) return

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
}

onMounted(() => authWithProvider())
</script>

<template>
  <n-spin />
</template>
