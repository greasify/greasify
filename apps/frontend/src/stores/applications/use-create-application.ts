import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { FormInst } from 'naive-ui'

import { usePocketbase } from '../use-pocketbase.js'

const INITIAL_FORM = {
  name: '',
  tags: [],
  isPrivate: false
}

export const useCreateApplication = defineStore('create-application', () => {
  const pocketbase = usePocketbase()
  const formRef = ref<FormInst | null>(null)
  const formModel = ref(structuredClone(INITIAL_FORM))

  function $reset() {
    formModel.value = structuredClone(INITIAL_FORM)
  }

  async function create() {
    if (!pocketbase.pb) return
    await pocketbase.pb.collection('applications').create({
      name: formModel.value.name,
      latest_version: '0.0.0',
      is_private: formModel.value.isPrivate,
      tags: formModel.value.tags
    })
  }

  return {
    formRef,
    formModel,
    create,
    $reset
  }
})
