<template>
  <div class="detail">
    <div class="px-4 py-5 my-5 text-center">
      <img class="mb-4 w-50" :src="momentDetail?.momentUrl" />
      <h1 class="display-5 fw-bold">{{ momentDetail?.title }}</h1>
      <p>{{ momentDetail?.description }}</p>
      <button
        v-if="momentDetail?.author.id == userId"
        type="button"
        class="btn btn-sm btn-outline-secondary mx-1"
        publicType="edit"
        @click="goEditor"
      >
        编辑
      </button>
      <button
        v-if="momentDetail?.author.id == userId"
        type="button"
        class="btn btn-sm btn-outline-danger"
        @click.prevent="modalIsVisible = true"
      >
        删除
      </button>
      <div class="col-lg-8 mx-auto">
        <v-md-preview
          :text="momentDetail?.content"
          ref="preview"
        ></v-md-preview>
        <div class="d-grid gap-2 d-sm-flex justify-content-sm-center"></div>
      </div>
    </div>

    <!-- Modal -->
    <modal
      title="删除文章"
      :visible="modalIsVisible"
      @model-on-close="modalIsVisible = false"
      @model-on-confirm="onConfirm"
    >
      <p>确定要删除这篇文章吗？</p>
    </modal>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import {
  getMomentByIdRequest,
  deleteMomentRequest,
} from '@/service/main/moment'
import { IMoment } from '@/service/main/moment'
import { IDataType } from '@/service/type'
import createMessage from '@/components/createMessage'
import Modal from '@/components/Modal.vue'
import { useUserStore } from '@/store'

const route = useRoute()
const router = useRouter()
let momentDetail = ref<IMoment>()
getMomentByIdRequest(route.params.id as string).then(
  (res: IDataType<IMoment>) => {
    momentDetail.value = res.data
  }
)

const goEditor = () => {
  router.push({
    name: 'editor',
    params: {
      id: momentDetail.value?.id,
      publicType: 'edit',
    },
  })
}
const modalIsVisible = ref(false)
const onConfirm = async () => {
  modalIsVisible.value = false
  const id = route.params.id
  const res = await deleteMomentRequest(id)
  // 确认删除弹窗
  if (res.code == 200) {
    createMessage('删除成功', 'success')
    router.push('/user')
  }
}

const userStore = useUserStore()
const userId = userStore.userInfo.id
</script>

<style scoped lang="less"></style>
