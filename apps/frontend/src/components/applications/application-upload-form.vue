<script setup lang="ts">
import { ref, computed, h } from 'vue'
import { NUpload, NInput, NButton, NDataTable, NTag, NText } from 'naive-ui'
import type { UploadInst, UploadFileInfo, DataTableColumns } from 'naive-ui'
import { discrete } from '@/stores/use-discrete.js'
import { useApplicationFiles } from '@/stores/applications/use-application-files.js'

const props = defineProps<{
  userId: string
  applicationId: string
}>()

const versionInput = ref('')
const tagInput = ref('')
const uploadRef = ref<UploadInst | null>(null)
const selectedFile = ref<UploadFileInfo[]>([])

const { files, createFile, deleteFile } = useApplicationFiles()

const isFormDisabled = computed(() => {
  return versionInput.value === '' || tagInput.value === '' || selectedFile.value.length === 0
})

function onSubmit() {
  const formData = new FormData();

  formData.append('version', versionInput.value)
  formData.append('tag', tagInput.value)
  formData.append('script', selectedFile.value[0].file as File);
  formData.append('user', props.userId)
  formData.append('application', props.applicationId)

  createFile(formData)
}

type RowData = {
  id: string
  version: string
  tag: number
}


const createColumns = (): DataTableColumns<RowData> => {
  return [
    {
      title: 'Version',
      key: 'version'
    },
    {
      title: 'Tag',
      key: 'tag',
      render(row) {
        return h(
          NTag,
          {
            style: {
              marginRight: '6px'
            },
            type: 'info',
            bordered: false
          },
          {
            default: () => row.tag
          }
        )
      }
    },
    {
      title: 'Actions',
      key: 'actions',
      render(row) {
        return h(
          NButton,
          {
            size: 'small',
            type: 'warning',
            onClick: () => {
              discrete.dialog.create({
                title: 'Confirm',
                content: `Are you sure you want to delete ${row.version}?`,
                positiveText: 'Ok',
                onPositiveClick: async () => {
                  await deleteFile(row.id)
                }
              })
            }
          },
          { default: () => 'Delete' }
        )
      }
    }
  ]
}
</script>

<template>
  <n-data-table
    :bordered="false"
    :single-line="false"
    :columns="createColumns()"
    :data="files"
    :pagination="{ pageSize: 10 }"
  />

  <div>
    <div>
      <n-text>Version</n-text>
      <n-input v-model:value="versionInput" type="text" placeholder="1.0.0" />
    </div>

    <div>
      <n-text>Tag</n-text>
      <n-input v-model:value="tagInput" type="text" placeholder="beta" />
    </div>

    <div>
      <n-text>Script</n-text>
      <n-upload
        ref="uploadRef"
        :default-upload="false"
        :multiple="false"
        :max="1"
        @change="({ fileList }) => selectedFile = fileList"
        accept=".user.js"
      >
        <n-button>Select File</n-button>
      </n-upload>
    </div>

    <n-button :disabled="isFormDisabled" @click="onSubmit">Submit</n-button>
  </div>
</template>
