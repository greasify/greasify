<script setup lang="ts">
import { NButton, NSpin } from 'naive-ui'

import { useAuth } from '@/stores/use-auth.js'

const auth = useAuth()
</script>

<template>
  <n-spin v-if="auth.isLoading" />
  <template v-else v-for="authProvider in auth.authProviders" :key="authProvider">
    <n-button @click="auth.signIn(authProvider)">Login with {{ authProvider.displayName }}</n-button>
  </template>
</template>
