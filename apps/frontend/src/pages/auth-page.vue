<script setup lang="ts">
import { NButton, NSpin } from 'naive-ui'

import { useAuth } from '@/stores/use-auth.js'

const auth = useAuth()
</script>

<template>
  <n-spin v-if="auth.isAuthenticated" />
  <n-button
    v-else
    @click="auth.signIn()"
    >Login with GitHub</n-button
  >
</template>
