<template>
  <div>
    <table class="table table-striped container">
      <thead>
        <tr>
          <th scope="col">序号</th>
          <th scope="col">标题</th>
          <th scope="col">作者</th>
          <th scope="col">内容</th>
          <th scope="col">点赞数</th>
          <th scope="col">更新时间</th>
          <th scope="col">操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in momentList" :key="item.id">
          <th scope="row">{{ index + 1 + offset }}</th>
          <th scope="row" class="title">{{ item.title }}</th>
          <th scope="row">{{ item.author.name }}</th>
          <th scope="row" max-height="100px" class="content">
            {{ item.content }}
          </th>
          <th scope="row">{{ item.likeCount }}</th>
          <th scope="row">{{ formatUtcString(item.updateTime) }}</th>
          <th scope="row">
            <button @click="getDetail(item.id)">查看</button>
            <button @click="deleteMoment(item.id)">删除</button>
          </th>
        </tr>
      </tbody>
    </table>
    <pagination
      :pageNo="pageNo"
      :pageSize="limit"
      :total="count"
      :continues="5"
      @getPageNo="getPageNo"
    />
    <modal
      title="文章详情"
      :visible="modalIsVisible"
      @model-on-close="modalIsVisible = false"
      @model-on-confirm="modalIsVisible = false"
      :bigModal="true"
    >
      <div class="col-lg-12 mx-auto">
        <v-md-preview
          :text="momentDetail?.content"
          ref="preview"
        ></v-md-preview>
        <div class="d-grid gap-2 d-sm-flex justify-content-sm-center"></div>
      </div>
    </modal>

    <modal
      title="提示"
      :visible="deleteModalIsVisible"
      @model-on-close="deleteModalIsVisible = false"
      @model-on-confirm="onConfirm"
    >
      <p>确认要删除该篇文章吗？</p>
    </modal>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import {
  getMomentListRequest,
  MomentType,
  getMomentByIdRequest,
} from '@/service/main/moment'
import { getMomentCountReq, deleteMomentReqAd } from '@/service/admin/manage'
import { formatUtcString } from '@/utils/date-format'
import Pagination from '@/components/Pagination.vue'
import Modal from '@/components/Modal.vue'
import createMessage from '@/components/createMessage'
const limit = ref(6)
const offset = ref(0)
const momentList = ref<MomentType[] | null | undefined>()
const count = ref(0)
const pageNo = ref(1)
const modalIsVisible = ref(false)
const deleteModalIsVisible = ref(false)

onMounted(async () => {
  getData()
})
const getCount = async () => {
  const res = await getMomentCountReq()
  count.value = res.data
}
const getData = async () => {
  const res = await getMomentListRequest(limit.value, offset.value)
  momentList.value = res.data
  getCount()
}
const getPageNo = (p: number) => {
  offset.value = (p - 1) * limit.value
  pageNo.value = p
  getData()
}
const momentDetail = ref<MomentType>()
const getDetail = async (id: string) => {
  modalIsVisible.value = true
  const res = await getMomentByIdRequest(id)
  momentDetail.value = res.data
}

const currentId = ref('')
const deleteMoment = (id: string) => {
  deleteModalIsVisible.value = true
  currentId.value = id
}
const onConfirm = async () => {
  const res = await deleteMomentReqAd(currentId.value)
  if (res.code == 200) {
    createMessage('删除成功', 'success')
    deleteModalIsVisible.value = false
    getData()
  }
}
</script>

<style scoped lang="less">
.title {
  width: 150px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.content {
  max-width: 300px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.modal-content {
  width: 800px;
}
</style>
