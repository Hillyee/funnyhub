<template>
  <div class="container-fuild">
    <!-- 导航列表 -->
    <global-header :user="testUser"></global-header>
    <!-- 内容列表 -->
    <div class="list" v-infinite-scroll="load">
      <nav-card :list="momentList" @click="handleCardClick"></nav-card>
    </div>

    <el-backtop :right="100" :bottom="100" />
    <footer class="text-center py-4 text-secondary bg-light mt-6">
      <small>
        <ul class="list-inline mb-0">
          <li class="list-inline-item">© 2022 分享平台专栏</li>
          <li class="list-inline-item">课程</li>
          <li class="list-inline-item">文档</li>
          <li class="list-inline-item">联系</li>
          <li class="list-inline-item">更多</li>
        </ul>
      </small>
    </footer>
  </div>
</template>
<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { momentListRequest } from '@/service/main/moment'
import { useRouter } from 'vue-router'
import navCard from '@/components/nav-card.vue'
import globalHeader from '@/components/global-header.vue'
import { UserProps } from '@/components/types'

const testUser: UserProps = {
  name: 'yuzi',
  isLogin: false,
}

const listQuery = reactive({
  limit: 10,
  offset: 0,
})

let momentList = ref()

momentListRequest(listQuery.limit, listQuery.offset).then(res => {
  momentList.value = res.data
  // console.log(momentList.value)
})

const router = useRouter()
const handleCardClick = () => {
  router.push({
    name: 'detail',
  })
}

// 无限滚动
const load = () => {
  // listQuery.offset += 10
  // momentListRequest(listQuery.limit, listQuery.offset).then(res => {
  //   res.data?.forEach(item => {
  //     momentList.value.push(item)
  //   })
  //   console.log(momentList.value)
  // })
}
</script>

<style scoped lang="less">
.home {
  .list {
    width: 70%;
    margin: 0 auto;
  }
}
</style>
