<script setup lang="ts">
import { NSpin } from 'naive-ui'
import { onMounted } from 'vue'
import { useRouteQuery } from '@vueuse/router'
import { usePocketbase } from '@/stores/use-pocketbase'
import { useAuth } from '@/stores/use-auth.js'
import { useRouter } from 'vue-router'

const auth = useAuth()
const pocketbase = usePocketbase()
const router = useRouter()

const code = useRouteQuery<string>('code')

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

    router.push({ name: 'dashboard' })
  } catch (err) {
    console.error(err)
  }
}

onMounted(() => authWithProvider())
</script>

<template>
  <n-spin />
</template>
