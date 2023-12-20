import Pocketbase from '@greasify/pocketbase'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { BaseAuthStore } from '@greasify/pocketbase'
import type { TypedPocketBase } from '@greasify/pocketbase/types'

export const usePocketbase = defineStore('pocketbase', () => {
  const pocketbase = ref<TypedPocketBase | null>(null)

  function connect(authStore?: BaseAuthStore): void {
    pocketbase.value = new Pocketbase(
      location.origin,
      authStore
    ) as TypedPocketBase
  }

  return {
    pocketbase,
    connect
  }
})
