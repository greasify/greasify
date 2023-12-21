<script setup lang="ts">
import { ClientResponseError } from '@greasify/pocketbase'
import { capitalize } from '@zero-dependency/utils'
import {
  NButton,
  NDynamicTags,
  NForm,
  NFormItem,
  NInput,
  NModal,
  NSwitch
} from 'naive-ui'
import { storeToRefs } from 'pinia'
import type { FormRules } from 'naive-ui'

import { useCreateApplication } from '@/stores/applications/use-create-application.js'
import { useDiscrete } from '@/stores/use-discrete.js'

const showModal = defineModel<boolean>('showModal')

const discrete = useDiscrete()
const createApplication = useCreateApplication()
const { formRef, formModel } = storeToRefs(createApplication)

const formRules: FormRules = {
  name: {
    required: true,
    type: 'string',
    trigger: ['input', 'blur']
  },
  tags: {
    required: false,
    type: 'array',
    trigger: ['input', 'blur'],
    max: 10
  }
}

async function handleValidateButtonClick(event: MouseEvent) {
  event.preventDefault()

  try {
    if (!formRef.value) return
    await formRef.value.validate()
    await createApplication.create()
  } catch (err) {
    if (err instanceof ClientResponseError) {
      for (const [name, data] of Object.entries(err.data.data)) {
        // @ts-ignore
        discrete.message.error(`${capitalize(name)}: ${data.message}`, {
          showIcon: true
        })
      }
    }

    return
  }

  createApplication.$reset()
  showModal.value = false
}
</script>

<template>
  <n-modal
    v-model:show="showModal"
    :show-icon="false"
    style="width: 600px"
    preset="dialog"
    :closable="true"
  >
    <template #header>
      <div>Create application</div>
    </template>
    <n-form
      ref="formRef"
      :model="formModel"
      :rules="formRules"
      label-placement="left"
      require-mark-placement="right-hanging"
      size="medium"
      label-width="auto"
      style="margin-top: 24px"
    >
      <n-form-item
        label="Name"
        path="name"
      >
        <n-input
          v-model:value="formModel.name"
          placeholder="Input"
        />
      </n-form-item>

      <n-form-item
        label="Tags"
        path="tags"
      >
        <n-dynamic-tags v-model:value="formModel.tags" />
      </n-form-item>

      <n-form-item
        label="Private"
        path="isPrivate"
      >
        <n-switch v-model:value="formModel.isPrivate" />
      </n-form-item>
    </n-form>
    <template #action>
      <n-button
        @click="handleValidateButtonClick"
        type="primary"
        >Create</n-button
      >
    </template>
  </n-modal>
</template>
