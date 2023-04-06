<template>
  <div>
    <table class="table table-striped container">
      <thead>
        <tr>
          <th scope="col">序号</th>
          <th scope="col">id</th>
          <th scope="col">用户名</th>
          <th scope="col">邮箱</th>
          <th scope="col">个性签名</th>
          <th scope="col">创建时间</th>
          <th scope="col">更新时间</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in userList" :key="item.id">
          <th scope="row">{{ index + 1 + offset }}</th>
          <th scope="row">{{ item.id }}</th>
          <th scope="row">{{ item.name }}</th>
          <th scope="row">{{ item.email }}</th>
          <th scope="row">{{ item.sign }}</th>
          <th scope="row">{{ formatUtcString(item.createAt) }}</th>
          <th scope="row">{{ formatUtcString(item.updateAt) }}</th>
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
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { getAllUserReq, UserType } from '@/service/admin/manage'
import { formatUtcString } from '@/utils/date-format'
import Pagination from '@/components/Pagination.vue'
const limit = ref(5)
const offset = ref(0)
const userList = ref<UserType[] | null | undefined>()
const count = ref(0)
const pageNo = ref(1)

onMounted(async () => {
  getData()
})

const getData = async () => {
  const res = await getAllUserReq(limit.value, offset.value)
  userList.value = res.data.rows
  count.value = res.data.count
}
const getPageNo = (p: number) => {
  offset.value = (p - 1) * limit.value
  pageNo.value = p
  getData()
}
</script>

<style scoped lang="less"></style>
