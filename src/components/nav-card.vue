<script lang="ts" setup>
import { formatUtcString } from "@/utils/date-format"
import { useRouter } from "vue-router"
const props = defineProps({
  list: Object,
})

const router = useRouter()
// 点击某篇文章进入详情页
const handleCardClick = (id: number) => {
  router.push({
    name: "detail",
    params: {
      id,
    },
  })
}
</script>

<template>
  <div class="nav-card">
    <div
      class="card"
      v-for="item in props.list"
      :key="item.id"
      @click="handleCardClick(item.id)"
    >
      <div class="content-top">
        <span><el-avatar :size="35" :src="item.author.avatarURL" /></span>
        <span
          >{{ item.author.name }} | {{ formatUtcString(item.updateTime) }} |
          <span v-for="label in item.labels" :key="label.id"
            >#{{ label.name }}</span
          ></span
        >
      </div>
      <div class="content">
        <el-row>
          <el-col :span="18">
            <h3>{{ item.title }}</h3>
            <div>{{ item.description }}</div>
          </el-col>
          <el-col :span="6">
            <el-image
              v-if="item.images"
              style="width: 120px; height: 120px"
              :src="item.images[0]"
              fit="cover"
            />
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.card {
  background-color: aliceblue;
  padding: 20px;
  height: 150px;
  border: 2px solid skyblue;
  margin: 8px;

  .content-top {
    span {
      margin-right: 5px;
    }
    display: flex;
    align-items: center;
    color: #86909c;
  }
}

.card:hover {
  background-color: rgb(235, 244, 252);
  cursor: pointer;
}
</style>
