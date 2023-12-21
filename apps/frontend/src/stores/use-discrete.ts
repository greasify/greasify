import { createDiscreteApi, darkTheme } from 'naive-ui'
import { defineStore } from 'pinia'

export const useDiscrete = defineStore('discrete', () => {
  const { message, notification, dialog, loadingBar } = createDiscreteApi(
    [
      'message',
      'dialog',
      'notification',
      'loadingBar'
    ],
    {
      configProviderProps: {
        theme: darkTheme
      }
    }
  )

  return {
    message,
    notification,
    dialog,
    loadingBar
  }
})
