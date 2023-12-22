import { defineStore } from 'pinia'
import { onMounted, ref } from 'vue'
import type {
  ApplicationsResponse,
  ScriptsResponse
} from '@greasify/pocketbase/types'

import { usePocketbase } from '../use-pocketbase.js'
import { useUser } from '../use-user.js'

export type Application = ApplicationsResponse<string[], { scripts: ScriptsResponse[] }>

export const useApplications = defineStore('applications', () => {
  const user = useUser()
  const pocketbase = usePocketbase()
  const applications = ref<Application[]>([])

  onMounted(async () => {
    applications.value = await pocketbase.pb
      .collection('applications')
      .getFullList({ expand: 'scripts' })
  })

  async function deleteApplication(applicationId: string) {
    const isDeleted = await pocketbase.pb
      .collection('applications')
      .delete(applicationId)

    if (isDeleted) {
      await pocketbase.pb.collection('users').update(user.userId, {
        'applications-': applicationId
      })

      applications.value = applications.value.filter(
        (app) => app.id !== applicationId
      )
    }
  }

  async function createApplication(data: Partial<Application>) {
    const newApplication = await pocketbase.pb
      .collection('applications')
      .create<Application>(data)

    await pocketbase.pb.collection('users').update(user.userId, {
      'applications+': newApplication.id
    })

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
