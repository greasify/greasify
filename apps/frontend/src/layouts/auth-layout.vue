<script setup lang="ts">
import { NLayout } from 'naive-ui'
</script>

<template>
  <n-layout style="height: 100vh">
    <n-layout has-sider>
      <router-view v-slot="{ Component, route }">
        <div class="content">
          <component :key="route.path" :is="Component" />
        </div>
      </router-view>
    </n-layout>
  </n-layout>
</template>

<style scoped>
.content {
  height: 100vh;
  width: 100%;
  align-items: center;
  justify-content: center;
  display: flex;
}
</style>
