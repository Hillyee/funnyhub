<template>
  <div class="file-upload">
    <div
      class="file-upload-container"
      @click.prevent="triggerUpload"
      v-bind="$attrs"
    >
      <slot v-if="fileStatus === 'loading'" name="loading">正在上传</slot>
      <!-- <slot v-else-if="fileStatus === 'success'" name="uploaded">
        <button class="btn btn-primary">上传成功</button>
      </slot> -->
      <slot v-else name="default">
        <button class="btn btn-primary">点击上传</button>
      </slot>
    </div>
    <input
      type="file"
      class="file-input d-none"
      ref="fileInputRef"
      @change="handleFileChange"
      name="avatar"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, PropType, watch } from 'vue'
import { uploadAvatar } from '@/service/main/setting'
type UploadStatus = 'ready' | 'loading' | 'success' | 'error'
type CheckFunction = (file: File) => boolean
const props = defineProps({
  action: {
    type: String,
    required: true,
  },
  beforeUpload: {
    type: Function as PropType<CheckFunction>,
  },
  uploaded: {
    type: Object,
    default: {},
  },
})
const emit = defineEmits(['file-uploaded', 'file-uploaded-error'])
const fileInputRef = ref<null | HTMLInputElement>(null)
const fileStatus = ref<UploadStatus>('ready')
const triggerUpload = () => {
  if (fileInputRef.value) {
    fileInputRef.value.click()
  }
}
const uploadedData = ref(props.uploaded)
watch(
  () => props.uploaded,
  newValue => {
    if (newValue) {
      fileStatus.value = 'success'
      uploadedData.value = newValue
    }
  }
)
const handleFileChange = (e: Event) => {
  const currentTarget = e.target as HTMLInputElement
  if (currentTarget.files) {
    const files = Array.from(currentTarget.files)
    if (props.beforeUpload) {
      const result = props.beforeUpload(files[0])
      if (!result) {
        return
      }
    }
    fileStatus.value = 'loading'
    const formData = new FormData()
    formData.append('avatar', files[0])
    uploadAvatar(formData)
      .then(resp => {
        setTimeout(() => {
          fileStatus.value = 'success'
        }, 500)
        uploadedData.value = resp.data
        emit('file-uploaded', resp)
      })
      .catch(error => {
        fileStatus.value = 'error'
        emit('file-uploaded-error', { error })
      })
      .finally(() => {
        if (fileInputRef.value) {
          fileInputRef.value.value = ''
        }
        setTimeout(() => {
          fileStatus.value = 'ready'
        }, 500)
      })
  }
}
</script>

<style scoped>
.file-upload-container img {
  width: 70px;
  height: 100%;
  object-fit: cover;
  cursor: pointer;
}
</style>
