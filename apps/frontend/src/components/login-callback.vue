<script setup lang="ts">
import { useStorage } from '@vueuse/core'
import { onMounted } from 'vue'
import type { AuthProviderInfo } from '@greasify/pocketbase'

import { usePocketbase } from '@/composables/use-pocketbase'

const props = defineProps<{
  authCode: string
  authState: string
}>()

const authProvider = useStorage<AuthProviderInfo | null>(
  'provider',
  null,
  localStorage,
  {
    serializer: {
      read: (v) => (v ? JSON.parse(v) : null),
      write: (v) => JSON.stringify(v)
    }
  }
)

const pb = usePocketbase()

onMounted(async () => {
  if (!authProvider.value) return

  if (authProvider.value.state !== props.authState) {
    console.log("State parameters don't match.")
    return
  }

  pb.connect()
  const response = await pb
    .pocketbase!.collection('users')
    .authWithOAuth2Code(
      authProvider.value.name,
      props.authCode,
      authProvider.value.codeVerifier,
      window.location.href
    )

  console.log(response)
})
</script>

<template>
  <div>
    {{ authProvider }}
  </div>
</template>
