<script setup lang="ts">
import { QuillEditor } from '@vueup/vue-quill'
import '@/styles/quill.css'
import { useThemeVars } from 'naive-ui';

const props = defineProps<{
  content: string
}>()

const emit = defineEmits<{
  (e: 'update:content', value: string): void
}>()

function onUpdateContent(value: string) {
  emit('update:content', value)
}

const themeVars = useThemeVars()
</script>

<template>
  <div style="padding-bottom: 1rem;">
    <QuillEditor
      :content="props.content"
      @update:content="onUpdateContent"
      content-type="html"
      toolbar="full"
      theme="snow"
    />
  </div>
</template>

<style scoped>
:deep(*) {
  --border-color: v-bind('themeVars.borderColor');
  --hover-color: v-bind('themeVars.actionColor');
  --icon-color: v-bind('themeVars.iconColor');
  --link-color: v-bind('themeVars.tagColor');
  --active-color: v-bind('themeVars.primaryColor');
  --background-color: v-bind('themeVars.cardColor');
}
</style>
