import { onMounted, ref } from 'vue'
import type { FilesResponse } from '@greasify/pocketbase/types'

import { usePocketbase } from '../use-pocketbase.js'

export function useApplicationFiles() {
  const pocketbase = usePocketbase()
  const files = ref<FilesResponse[]>([])

  async function createFile(body: FormData) {
    const newFile = await pocketbase.pb
      .collection('files')
      .create<FilesResponse>(body)
    files.value.push(newFile)
  }

  async function deleteFile(fileId: string) {
    const isDeleted = await pocketbase.pb.collection('files').delete(fileId)
    if (isDeleted) {
      files.value = files.value.filter((file) => file.id !== fileId)
    }
  }

  onMounted(async () => {
    files.value = await pocketbase.pb.collection('files').getFullList()
  })

  return {
    files,
    createFile,
    deleteFile
  }
}
