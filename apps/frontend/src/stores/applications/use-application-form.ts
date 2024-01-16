import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { FormInst, FormRules } from 'naive-ui'

const INITIAL_FORM_MODEL = {
  name: '',
  description: '',
  readme: '',
  tags: [] as string[],
  is_private: false
}

export const useApplicationForm = defineStore('application-form', () => {
  const formRef = ref<FormInst | null>(null)
  const formRules = ref<FormRules>({
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
  })
  const formModel = ref(structuredClone(INITIAL_FORM_MODEL))

  function $reset() {
    formModel.value = structuredClone(INITIAL_FORM_MODEL)
  }

  return {
    formRef,
    formRules,
    formModel,
    $reset
  }
})
