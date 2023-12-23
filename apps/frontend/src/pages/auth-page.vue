<script setup lang="ts">
import { h, type FunctionalComponent } from 'vue'
import { IconBrandGithub, IconBrandGitlab } from '@tabler/icons-vue'
import type { SVGProps } from '@tabler/icons-vue'
import { NGradientText, NButton } from 'naive-ui'
import { useAuth } from '@/stores/use-auth.js'

const auth = useAuth()

const icons: Record<string, FunctionalComponent<SVGProps>> = {
  github: IconBrandGithub,
  gitlab: IconBrandGitlab
}
</script>

<template>
  <div>
    <n-gradient-text tag="h1" class="title"
      gradient="linear-gradient(225.62deg, #6DEFF7 9.02%, #AF5FDA 49.75%, #F82697 90.73%)">
      Greasify
    </n-gradient-text>
    <div class="providers">
      <n-button v-for="authProvider in auth.authProviders" :key="authProvider.name"
        :render-icon="() => h(icons[authProvider.name])" @click="auth.signIn(authProvider)" block>
        Login with {{ authProvider.displayName }}
      </n-button>
    </div>
  </div>
</template>

<style scope>
.title {
  margin-bottom: 32px;
  font-size: 64px;
  font-weight: 600;
}

.providers {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>
