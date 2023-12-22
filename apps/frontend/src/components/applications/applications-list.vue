<script setup lang="ts">
import { NButton, NCard, NGrid, NGridItem, NSpace, NTag } from 'naive-ui'
import { h } from 'vue'
import { useApplications, type Application } from '@/stores/applications/use-applications.js'
import { discrete } from '@/stores/use-discrete.js'
import ApplicationModalContent from './application-modal-content.vue'

const applications = useApplications()

function createApplication() {
  discrete.dialog.create({
    title: 'Create application',
    style: {
      width: '800px'
    },
    showIcon: false,
    content: () => h(ApplicationModalContent)
  })
}

async function deleteApplication(application: Application) {
  discrete.dialog.warning({
    title: 'Confirm',
    content: `Are you sure you want to delete ${application.name}?`,
    positiveText: 'Ok',
    negativeText: 'Cancel',
    onPositiveClick: async () => {
      await applications.deleteApplication(application.id)
    }
  })
}

function editApplication(application: Application) {
  discrete.dialog.create({
    title: 'Edit application',
    style: {
      width: '800px'
    },
    showIcon: false,
    content: () => h(ApplicationModalContent, { application })
  })
}
</script>

<template>
  <n-button @click="createApplication">Create application</n-button>
  <n-grid style="margin-top: 24px" :x-gap="12" :y-gap="12" cols="2 400:3 600:6" responsive="screen">
    <n-grid-item v-for="app in applications.list" :key="app.name">
      <n-card :title="app.name">
        <n-space>
          <n-tag v-if="app.is_verified" type="success">Verified</n-tag>
          <n-tag v-if="app.is_deprecated" type="error">Deprecated</n-tag>
          <n-tag type="info">{{ app.is_private ? 'Private' : 'Public' }}</n-tag>
          <n-tag type="info">{{ app.latest_version }}</n-tag>
        </n-space>
        <n-space v-if="app.tags?.length" style="margin-top: 12px;">
          <n-tag v-for="tag in app.tags" :key="tag">{{ tag }}</n-tag>
        </n-space>
        <n-space style="margin-top: 24px">
          <n-button type="primary" :disabled="app.is_banned" @click="editApplication(app)" ghost block>
            Edit
          </n-button>
          <n-button type="error" :disabled="app.is_banned" @click="deleteApplication(app)" ghost block>
            Delete
          </n-button>
        </n-space>
      </n-card>
    </n-grid-item>
  </n-grid>
</template>
