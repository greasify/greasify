import { createDiscreteApi, darkTheme } from 'naive-ui'

export const discrete = createDiscreteApi(
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
