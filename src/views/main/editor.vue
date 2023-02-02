<template>
  <div class="editor">
    <div class="header">
      <input placeholder="请输入标题..." class="editor-input" v-model="title" />
      <button
        type="button"
        class="btn btn-dark"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        data-bs-whatever="@mdo"
        @click="onPublic"
      >
        发布
      </button>
      <button
        type="button"
        class="btn btn-outline-secondary"
        @click="handleGoHomeClick"
        style="margin-left: 10px"
      >
        返回首页
      </button>
    </div>
    <v-md-editor v-model="content" height="90%" class="md-editor"></v-md-editor>

    <div
      class="modal fade"
      id="exampleModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">发表文章</h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <ValidateForm>
              <div class="mb-3">
                <ValidateInput
                  class="form-control"
                  label="标签"
                  v-model="labelVal"
                  tag="select"
                  :selectList="selectList"
                  @getLabelList="getLabelList"
                />
              </div>
              <div class="mb-3">
                <ValidateInput
                  type="text"
                  class="form-control"
                  label="描述"
                  v-model="descriptionVal"
                  tag="textarea"
                />
              </div>
              <uploader
                action="/picture"
                :beforeUpload="uploadCheck"
                @file-uploaded="handleFileUploaded"
                uploadType="picture"
                class="d-flex align-items-center justify-content-center bg-light text-secondary w-100 my-4"
              >
                <template #default>
                  <h2>点击上传文章封面</h2>
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
                  <img :src="dataProps.uploadedData.url" alt="" width="500" />
                </template>
              </uploader>
              <template #submit>
                <button
                  type="button"
                  class="btn btn-primary"
                  @click="handlePublicClick"
                >
                  确定并发布
                </button>
              </template>
              <template #close>
                <button
                  type="button"
                  class="btn btn-secondary mx-2"
                  data-bs-dismiss="modal"
                  ref="closeBtnRef"
                >
                  关闭
                </button>
              </template>
            </ValidateForm>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useMomentStore } from '@/store'
import LocalCache from '@/utils/cache'
import createMessage from '@/components/createMessage'
import ValidateForm from '@/components/ValidateForm.vue'
import ValidateInput from '@/components/ValidateInput2.vue'
import Uploader from '@/components/Uploader.vue'
import { beforeUploadCheck } from '@/utils/uploadCheck'
import { reqLabelList } from '@/service/main/label'
import { IPictureType } from '@/service/main/moment'
const content = ref('')
const title = ref('')
const labelVal = ref('')
const descriptionVal = ref('')

// 返回首页
const router = useRouter()
const handleGoHomeClick = () => {
  router.push('/home')
}

let selectList = ref()
let limit = ref(5)
let offset = ref(0)
const onPublic = async () => {
  // 弹窗
  const res = await reqLabelList(limit.value, offset.value)
  selectList.value = res.data
}
const getLabelList = async () => {
  let newLimit = limit.value + 5
  let newOffset = offset.value + 5
  const res = await reqLabelList(newLimit, newOffset)
  for (let i in res.data) {
    selectList.value.push(res.data[i])
  }
  labelVal.value = selectList.value[0].name
}

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

let momentUrl = ref('')
const handleFileUploaded = (uploadData: IPictureType) => {
  momentUrl.value = uploadData.url
}

// 确定并发布
const momentStore = useMomentStore()

const closeBtnRef = ref<null | HTMLInputElement>(null)

const handlePublicClick = async () => {
  const token = LocalCache.getCache('token')
  if (!token) {
    router.push('/login')
  } else if (!content.value || !title.value) {
    createMessage('内容或标题不能为空', 'default')
  } else {
    let momentId: number
    const res = await momentStore.momentPublicAction(
      title.value,
      content.value,
      descriptionVal.value,
      momentUrl.value
    )

    if (res?.code == 200) {
      momentId = res.data.id
      // 调用保存动态与标签联系的接口
      await momentStore.setLabel(momentId, [labelVal.value])
    }

    closeBtnRef.value?.click()
    createMessage('发布成功', 'success')
    router.push('/user')
  }
}
</script>

<style scoped lang="less">
.editor {
  height: 100vh;
  .header {
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 0 30px;
    .el-avatar {
      margin-left: 8px;
    }

    .editor-input {
      flex: 1;
      height: 100%;
      border: 0;
      outline: none;
      font-size: 24px;
      font-weight: 500;
      color: #1d2129;
    }
  }
  .md-editor {
    font-size: 30px;
  }
}

.pic-class {
  width: 100px;
  height: 100px;
}
</style>
