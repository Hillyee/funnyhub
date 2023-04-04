<template>
  <div class="px-4 py-5 my-5 text-center">
    <uploader
      action="/upload"
      :beforeUpload="uploadCheck"
      :uploaded="uploadedData"
      @file-uploaded="handleFileUploaded"
      uploadType="avatar"
      class="d-flex align-items-center justify-content-center"
    >
      <template #default>
        <div class="avatar-container">
          <img v-if="avatarUrl" :src="avatarUrl" alt="头像" />
          <img v-else src="@/assets/default.png" alt="默认头像" />
        </div>
      </template>

      <template #loading>
        <div
          class="avatar-container d-flex align-items-center justify-content-center"
        >
          <div class="spinner-border text-secondary" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>
      </template>

      <template #uploaded="dataProps">
        <div class="uploaded-area">
          <img :src="dataProps.uploadedData?.url" alt="" width="100" />
        </div>
      </template>
    </uploader>
    <h1 class="display-5 my-10">个人资料</h1>
    <div class="col-lg-6 mx-auto">
      <validate-form @form-submit="onFormSubmit">
        <div class="row g-3">
          <div class="col-12">
            <div class="input-group has-validation">
              <validate-input
                :rules="nameRules"
                v-model="nameVal"
                label="昵称"
              />
            </div>
          </div>
        </div>
        <div class="row g-3">
          <div class="col-12">
            <div class="input-group has-validation">
              <validate-input
                :rules="emailRules"
                v-model="emailVal"
                label="邮箱"
              />
            </div>
          </div>
        </div>
        <div class="row g-3">
          <div class="col-12">
            <div class="input-group has-validation">
              <validate-input
                v-model="signVal"
                label="个性签名"
                tag="textarea"
              />
            </div>
          </div>
        </div>
        <template #submit>
          <button type="submit" class="btn btn-secondary btn-block btn-large">
            确认提交
          </button>
        </template>
      </validate-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'
import { useUserStore } from '@/store'
import ValidateForm from '@/components/ValidateForm.vue'
import ValidateInput from '@/components/ValidateInput.vue'
import Uploader from '@/components/Uploader.vue'
import { RulesProp } from '@/components/types'
import createMessage from '@/components/createMessage'
import { beforeUploadCheck } from '@/utils/uploadCheck'
import { IDataType } from '@/service/type'
import { AvatarType } from '@/service/main/setting'
import { getUserInfoById } from '@/service/main/setting'

type reloadType = () => void

const userStore = useUserStore()
const userInfo = computed(() => userStore.userInfo)

const signVal = ref('')
const avatarUrl = ref('')
const emailVal = ref('')
const nameVal = ref('')

const emailRules: RulesProp = [
  { type: 'required', message: '电子邮箱地址不能为空' },
  { type: 'email', message: '请输入正确的电子邮箱格式' },
]
const nameRules: RulesProp = [{ type: 'required', message: '昵称不能为空' }]
const uploadedData = ref()
onMounted(() => {
  getUserInfoById(userInfo.value.id).then(res => {
    const { avatarUrl, sign, email, name } = res.data
    signVal.value = sign
    emailVal.value = email

    nameVal.value = name
    if (avatarUrl) {
      uploadedData.value = {
        url: avatarUrl,
      }
    }
  })
})

const onFormSubmit = (result: boolean) => {
  if (result) {
    userStore.updateUserAction({
      id: userInfo.value.id,
      name: nameVal.value,
      sign: signVal.value,
      email: emailVal.value,
      avatarUrl: avatarUrl.value,
    })
  }
}

// 个性签名
const uploadCheck = (file: File) => {
  const result = beforeUploadCheck(file, {
    format: ['image/jpeg', 'image/png'],
    size: 1,
  })
  const { passed, error } = result
  if (error === 'format') {
    createMessage('上传图片只能是 JPG/PNG 格式!', 'error')
  }
  if (error === 'size') {
    createMessage('上传图片大小不能超过 1Mb', 'error')
  }
  return passed
}

const handleFileUploaded = (rawData: IDataType<AvatarType>) => {
  createMessage('上传头像成功', 'success')
  userStore.updateUserAvatar(rawData.data.avatarUrl)
  avatarUrl.value = rawData.data.avatarUrl
}

// 加载用户信息
</script>

<style scoped lang="less">
.avatar-container {
  width: 100px;
  height: 100px;
  margin-bottom: 15px;
  cursor: pointer;
}

.avatar-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
