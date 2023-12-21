<script setup lang="ts">
import { NButton, NLayout, NLayoutContent, NLayoutSider, NSpin } from 'naive-ui'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

import { useAuth } from '@/stores/use-auth.js'

const auth = useAuth()
const router = useRouter()
const isRouterReady = ref(false)

onMounted(async () => {
  await router.isReady()
  isRouterReady.value = true
})
</script>

<template>
  <n-layout
    style="height: 100vh"
    has-sider
  >
    <n-layout-sider content-style="padding: 24px;">
      <n-button
        @click="auth.signOut()"
        block
        >Sign Out</n-button
      >
    </n-layout-sider>
    <n-layout>
      <n-layout-content content-style="padding: 24px;">
        <div
          v-if="!isRouterReady"
          class="loader"
        >
          <n-spin size="large" />
        </div>
        <router-view
          v-else
          v-slot="{ Component, route }"
        >
          <component
            :key="route.path"
            :is="Component"
          />
        </router-view>
      </n-layout-content>
    </n-layout>
  </n-layout>
</template>

<style>
.loader {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}
</style>
