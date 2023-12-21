<script setup lang="ts">
import { NButton, NCard, NGrid, NGridItem, NSpace, NTag } from 'naive-ui'
import { ref, watch } from 'vue'
import type { ApplicationsResponse } from '@greasify/pocketbase/types'

import { useDiscrete } from '@/stores/use-discrete.js'
import { usePocketbase } from '@/stores/use-pocketbase.js'
import ApplicationCreateModal from './application-create-modal.vue'

const pocketbase = usePocketbase()
const discrete = useDiscrete()

const isOpenCreateApplicationModal = ref(false)
const applications = ref<ApplicationsResponse[] | null>(null)

async function fetchApplications() {
  if (!pocketbase.pb) return
  applications.value = await pocketbase.pb
    .collection('applications')
    .getFullList()
}

watch(
  () => isOpenCreateApplicationModal.value,
  async () => {
    await fetchApplications()
  },
  { immediate: true }
)

async function deleteApplication(application: ApplicationsResponse) {
  discrete.dialog.warning({
    title: 'Confirm',
    content: `Are you sure you want to delete ${application.name}?`,
    positiveText: 'Ok',
    negativeText: 'Cancel',
    onPositiveClick: async () => {
      await pocketbase.pb?.collection('applications').delete(application.id)
      await fetchApplications()
    }
  })
}
</script>

<template>
  <n-button @click="isOpenCreateApplicationModal = true"
    >Create application</n-button
  >
  <n-grid
    style="margin-top: 24px"
    :x-gap="12"
    :y-gap="12"
    cols="2 400:3 600:6"
    responsive="screen"
  >
    <n-grid-item
      v-for="app in applications"
      :key="app.name"
    >
      <n-card :title="app.name">
        <n-space>
          <n-tag
            v-if="app.is_verified"
            type="success"
            >Verified</n-tag
          >
          <n-tag
            v-if="app.is_deprecated"
            type="error"
            >Deprecated</n-tag
          >
          <n-tag type="info">{{ app.is_private ? 'Private' : 'Public' }}</n-tag>
          <n-tag type="info">{{ app.latest_version }}</n-tag>
        </n-space>
        <n-space style="margin-top: 24px">
          <!-- <n-button block>Edit</n-button> -->
          <n-button
            type="error"
            ghost
            @click="deleteApplication(app)"
            block
            >Delete</n-button
          >
        </n-space>
      </n-card>
    </n-grid-item>
  </n-grid>
  <application-create-modal v-model:show-modal="isOpenCreateApplicationModal" />
</template>
