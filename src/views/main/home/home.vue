<script lang="ts" setup>
import { reactive, ref } from "vue"
import { momentListRequest } from "@/service/main/moment"
import { useRouter } from "vue-router"
import navCard from "@/components/nav-card.vue"
import navHeader from "@/components/nav-header.vue"

const listQuery = reactive({
  limit: 10,
  offset: 0,
})

let momentList = ref()

momentListRequest(listQuery.limit, listQuery.offset).then((res) => {
  momentList.value = res.data
  // console.log(momentList.value)
})

const router = useRouter()
const handleCardClick = () => {
  router.push({
    name: "detail",
  })
}

// 无限滚动
const load = () => {
  listQuery.offset+=10
  momentListRequest(listQuery.limit, listQuery.offset).then((res) => {
    res.data?.forEach(item => {
      momentList.value.push(item)
    })
    console.log(momentList.value);
    
  })
}
</script>

<template>
  <div class="home">
    <!-- 导航列表 -->
    <nav-header></nav-header>
    <!-- 内容列表 -->
    <div class="list" v-infinite-scroll="load">
      <nav-card :list="momentList" @click="handleCardClick"></nav-card>
    </div>

    <el-backtop :right="100" :bottom="100" />
  </div>
</template>

<style scoped lang="less">
.home {
  .list {
    width: 70%;
    margin: 0 auto;
  }
}
</style>
