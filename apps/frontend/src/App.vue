<script setup lang="ts">
import { darkTheme, NConfigProvider } from 'naive-ui'
import { RouterView } from 'vue-router'
</script>

<template>
  <n-config-provider style="height: 100%" :theme="darkTheme">
    <router-view />
  </n-config-provider>
</template>
