import { defineStore } from 'pinia'
import { onMounted, ref } from 'vue'
import type {
  ApplicationsResponse,
  FilesResponse
} from '@greasify/pocketbase/types'

import { useAuth } from '../use-auth.js'
import { usePocketbase } from '../use-pocketbase.js'

export type Application = ApplicationsResponse<
  string[],
  { files: FilesResponse[] }
>

export const useApplications = defineStore('applications', () => {
  const auth = useAuth()
  const pocketbase = usePocketbase()
  const applications = ref<Application[]>([])

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

  async function createApplication(data: Partial<Application>) {
    const newApplication = await pocketbase.pb
      .collection('applications')
      .create<Application>({ ...data, user: auth.getUserId() })

    applications.value.push(newApplication)
  }

  async function updateApplication(application: Partial<Application>) {
    const updatedApplication = await pocketbase.pb
      .collection('applications')
      .update<Application>(application.id!, application)

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
