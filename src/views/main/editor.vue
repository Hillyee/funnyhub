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
                  ><button
                    type="button"
                    style="line-height: 30px; width: 100px"
                    @click="addLabel"
                  >
                    添加
                  </button>
                </ValidateInput>
                <div>
                  <button
                    type="button"
                    class="btn btn-secondary"
                    v-for="(item, index) in labelArr"
                    :key="index"
                    style="margin-right: 10px"
                  >
                    <span
                      >{{ item }}&nbsp;&nbsp;&nbsp;<span
                        @click="deleteLabel(index)"
                        >X</span
                      ></span
                    >
                  </button>
                </div>
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
                :uploaded="uploadedData"
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
                  <div class="uploaded-area">
                    <img
                      :src="dataProps.uploadedData?.url"
                      alt=""
                      width="500"
                    />
                    <h3>点击重新上传</h3>
                  </div>
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
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useMomentStore } from '@/store'
import LocalCache from '@/utils/cache'
import createMessage from '@/components/createMessage'
import ValidateForm from '@/components/ValidateForm.vue'
import ValidateInput from '@/components/ValidateInput.vue'
import Uploader from '@/components/Uploader.vue'
import { beforeUploadCheck } from '@/utils/uploadCheck'
import { IPictureType, getMomentByIdRequest } from '@/service/main/moment'
import { useRoute } from 'vue-router'

const route = useRoute()
const content = ref('')
const title = ref('')
const labelVal = ref('')
const labelArr = ref<Array<string>>([])
const descriptionVal = ref('')

// 返回首页
const router = useRouter()
const handleGoHomeClick = () => {
  router.push('/home')
}

// const getLabelList = async () => {
//   let newLimit = limit.value + 5
//   let newOffset = offset.value + 5
//   const res = await reqLabelList(newLimit, newOffset)
//   for (let i in res.data) {
//     selectList.value.push(res.data[i])
//   }
//   labelVal.value = selectList.value[0].name
// }

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

const uploadedData = ref()

onMounted(() => {
  if (route.params.id) {
    const currentId = route.params.id
    getMomentByIdRequest(currentId as string).then(res => {
      const momentDetail = res.data
      content.value = momentDetail.content
      title.value = momentDetail.title
      if (momentDetail.labels) {
        const arr = momentDetail.labels.map((item: any) => item.name)
        labelArr.value = arr
      } else {
        labelArr.value = []
      }

      descriptionVal.value = momentDetail.description || ''
      if (momentDetail.momentUrl) {
        uploadedData.value = { url: momentDetail.momentUrl }
      }
    })
  }
})
const handlePublicClick = async () => {
  const token = LocalCache.getCache('token')
  const publicType = route.params.publicType || 'add'
  if (!token) {
    router.push('/login')
  } else if (!content.value || !title.value) {
    createMessage('内容或标题不能为空', 'default')
  } else {
    let momentId: string
    if (publicType == 'add') {
      const res = await momentStore.momentPublicAction(
        title.value,
        content.value,
        descriptionVal.value,
        momentUrl.value
      )
      if (res?.code == 200) {
        momentId = res.data.id
        // 调用保存动态与标签联系的接口
        await momentStore.setLabel(momentId, labelArr.value)
        createMessage('发布成功', 'success')
        router.push(`/detail/${momentId}`)
      }
    } else if (publicType == 'edit') {
      console.log(labelArr.value)

      const currentId = route.params.id
      const res = await momentStore.momentUpdateAction(
        currentId,
        title.value,
        content.value,
        descriptionVal.value,
        momentUrl.value
      )
      if (res?.code == 200) {
        momentId = res.data.id
        // 调用保存动态与标签联系的接口
        await momentStore.setLabel(momentId, labelArr.value)
        createMessage('修改成功', 'success')
        router.push(`/detail/${momentId}`)
      }
    }
    closeBtnRef.value?.click()
  }
}

const addLabel = () => {
  labelArr.value.push(labelVal.value)
  labelVal.value = ''
}

const deleteLabel = (index: number) => {
  labelArr.value.splice(index, 1)
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
.uploaded-area {
  position: relative;
}
.uploaded-area:hover {
  opacity: 0.8;
}
.uploaded-area:hover h3 {
  display: block;
}
.uploaded-area h3 {
  display: none;
  position: absolute;
  color: #000;
  text-align: center;
  width: 100%;
  top: 50%;
}
</style>
