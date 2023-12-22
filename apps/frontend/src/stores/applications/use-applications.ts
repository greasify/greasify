import { defineStore } from 'pinia'
import { onMounted, ref } from 'vue'
import type { ApplicationsResponse } from '@greasify/pocketbase/types'

import { usePocketbase } from '../use-pocketbase.js'

export const useApplications = defineStore('applications', () => {
  const pocketbase = usePocketbase()
  const applications = ref<ApplicationsResponse<string[]>[]>([])

  onMounted(async () => {
    applications.value = await pocketbase.pb
      .collection('applications')
      .getFullList()
  })

  async function deleteApplication(applicationId: string) {
    const isDeleted = await pocketbase.pb
      .collection('applications')
      .delete(applicationId)

    if (isDeleted) {
      applications.value = applications.value.filter(
        (app) => app.id !== applicationId
      )
    }
  }

  async function createApplication(data: Partial<ApplicationsResponse>) {
    const newApplication = await pocketbase.pb
      .collection('applications')
      .create<ApplicationsResponse<string[]>>(data)

    applications.value.push(newApplication)
  }

  async function updateApplication(application: Partial<ApplicationsResponse>) {
    const updatedApplication = await pocketbase.pb
      .collection('applications')
      .update<ApplicationsResponse<string[]>>(application.id!, application)

    applications.value = applications.value.map((app) =>
      app.id === updatedApplication.id ? updatedApplication : app
    )
  }

  return {
    list: applications,
    deleteApplication,
    createApplication,
    updateApplication
  }
})
