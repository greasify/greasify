/// <reference types="astro/client" />

declare namespace App {
  interface Locals {
    pb: import('@greasify/pocketbase/types').TypedPocketBase
  }
}

interface ImportMetaEnv {
  readonly POCKETBASE_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
