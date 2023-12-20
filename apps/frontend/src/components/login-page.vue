<script setup lang="ts">
import type { AuthMethodsList, AuthProviderInfo } from '@greasify/pocketbase'

const props = defineProps<{
  authMethods: AuthMethodsList
}>()

function login(authProvider: AuthProviderInfo): void {
  localStorage.setItem('provider', JSON.stringify(authProvider))
  const redirectUrl = `${authProvider.authUrl}${window.location.origin}/callback`
  window.location.href = redirectUrl
}
</script>

<template>
  <button
    v-for="provider in props.authMethods.authProviders"
    :key="provider.name"
    @click="login(provider)"
  >
    {{ provider.displayName }}
  </button>
</template>
