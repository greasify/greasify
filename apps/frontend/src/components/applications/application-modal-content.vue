<script setup lang="ts">
import {
  NButton,
  NDynamicTags,
  NForm,
  NFormItem,
  NInput,
  NSwitch,
  NTabPane,
  NTabs
} from 'naive-ui'
import { storeToRefs } from 'pinia'
import { computed, onMounted, onUnmounted, ref } from 'vue'
import type {
  ApplicationsResponse,
  FilesResponse
} from '@greasify/pocketbase/types'

import { useApplicationForm } from '@/stores/applications/use-application-form.js'
import { useApplications } from '@/stores/applications/use-applications.js'
import { discrete } from '@/stores/use-discrete.js'

import ApplicationReadmeEditor from './application-readme-editor.vue'

const props = defineProps<{
  application?: ApplicationsResponse<string[], { files: FilesResponse[] }>
}>()

const applications = useApplications()
const applicationForm = useApplicationForm()
const { formRef, formRules, formModel } = storeToRefs(applicationForm)

const applicationReadme = ref(props.application?.readme ?? '')
const applicationScripts = ref<FilesResponse[]>([])
const isEdit = computed(() => Boolean(props.application))

onMounted(() => {
  if (!isEdit.value || !props.application) return
  // @ts-ignore
  formModel.value = props.application
})

onUnmounted(() => {
  applicationForm.$reset()
})

async function handleSubmit() {
  try {
    await formRef.value?.validate()

    formModel.value.readme = applicationReadme.value
    if (isEdit.value) {
      await applications.updateApplication(formModel.value)
    } else {
      await applications.createApplication(formModel.value)
    }

    discrete.dialog.destroyAll()
  } catch (err) {
    console.error(err)
  }
}
</script>

<template>
  <n-tabs default-value="Info" size="medium" justify-content="space-evenly">
    <n-tab-pane name="Info">
      <n-form ref="formRef" :model="formModel" :rules="formRules" label-placement="left"
        require-mark-placement="right-hanging" size="medium" label-width="auto">
        <n-form-item label="Name" path="name">
          <n-input :disabled="isEdit" v-model:value="formModel.name" />
        </n-form-item>

        <n-form-item label="Description" path="description">
          <n-input type="textarea" label="Description" v-model:value="formModel.description" />
        </n-form-item>

        <n-form-item label="Tags" path="tags">
          <n-dynamic-tags v-model:value="formModel.tags" />
        </n-form-item>

        <n-form-item label="Private" path="is_private">
          <n-switch v-model:value="formModel.is_private" />
        </n-form-item>
      </n-form>
    </n-tab-pane>

    <n-tab-pane :disabled="!isEdit" name="Readme">
      <application-readme-editor
        v-model:content="applicationReadme"
        @update:content="applicationReadme = $event"
      />
    </n-tab-pane>

    <n-tab-pane :disabled="applicationScripts.length === 0" name="Scripts">
      <div v-for="script in applicationScripts" :key="script.id">
        <h3>{{ script.version }}</h3>
      </div>
    </n-tab-pane>
  </n-tabs>
  <n-button @click="handleSubmit" block>
    {{ isEdit ? 'Save' : 'Create' }}
  </n-button>
</template>
