<template>
  <div>
    <table class="table table-striped container">
      <thead>
        <tr>
          <th scope="col">序号</th>
          <th scope="col">标签名称</th>
          <th scope="col">创建时间</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in labelList" :key="item.id">
          <th scope="row">{{ index + 1 + offset }}</th>
          <th scope="row">{{ item.name }}</th>
          <th scope="row">{{ formatUtcString(item.createAt) }}</th>
          <th scope="row">
            <button @click="deleteLabel(item.id)">删除</button>
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
      title="提示"
      :visible="modalIsVisible"
      @model-on-close="modalIsVisible = false"
      @model-on-confirm="onConfirm"
    >
      <p>确认要删除该标签吗？</p>
    </modal>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import {
  getAllLabelsReq,
  LabelType,
  deleteLabelReqAd,
} from '@/service/admin/manage'
import { formatUtcString } from '@/utils/date-format'
import createMessage from '@/components/createMessage'
import Pagination from '@/components/Pagination.vue'
import Modal from '@/components/Modal.vue'
const limit = ref(5)
const offset = ref(0)
const labelList = ref<LabelType[] | null | undefined>()
const count = ref(0)
const pageNo = ref(1)

onMounted(async () => {
  getData()
})

const getData = async () => {
  const res = await getAllLabelsReq(limit.value, offset.value)
  labelList.value = res.data.rows
  count.value = res.data.count
}
const getPageNo = (p: number) => {
  offset.value = (p - 1) * limit.value
  pageNo.value = p
  getData()
}
const modalIsVisible = ref(false)
const currentId = ref('')
const deleteLabel = (id: string) => {
  modalIsVisible.value = true
  currentId.value = id
}
const onConfirm = async () => {
  const res = await deleteLabelReqAd(currentId.value)
  if (res.code == 200) {
    createMessage('删除成功', 'success')
    modalIsVisible.value = false
    getData()
  }
}
</script>

<style scoped lang="less"></style>
