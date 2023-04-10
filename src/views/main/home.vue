<template>
  <div class="container-fuild">
    <main>
      <section class="py-5 text-center container">
        <div class="row py-lg-5">
          <div class="col-lg-6 col-md-8 mx-auto">
            <h1 class="fw-light">学无止境，进取不息。</h1>
            <p class="lead text-muted">
              欢迎来到博客，这里是分享个人见解和经验的地方。这里涉及的主题包括但不限于技术、编程、生活和旅行等方面。感谢你的光临，希望你能在这里找到有价值的内容。
            </p>

            <p>
              <router-link class="btn btn-primary my-2" to="/editor"
                >写文章</router-link
              >
              &nbsp;
              <router-link class="btn btn-secondary my-2" to="/user"
                >个人主页</router-link
              >
            </p>
            <!-- 搜索框 -->
            <div class="input-group input-group-lg">
              <input
                type="text"
                class="form-control py-3"
                placeholder="查询相关内容"
                aria-describedby="basic-addon1"
                v-model="searchObj.word"
              />
              <button
                class="btn btn-outline-secondary"
                type="button"
                id="inputGroupFileAddon04"
                @click="search(true)"
              >
                搜索
              </button>
            </div>
          </div>
        </div>
      </section>

      <div class="album py-5 bg-light">
        <div
          v-if="momentList.length"
          class="container"
          v-infinite-scroll="loadMore"
          infinite-scroll-immediate-check="false"
          :infinite-scroll-disabled="busy"
          :infinite-scroll-distance="20"
        >
          <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
            <div class="col" v-for="(item, index) in momentList" :key="index">
              <div class="card shadow-sm">
                <img v-if="item.momentUrl" :src="item.momentUrl" alt="" />
                <svg
                  v-else
                  class="bd-placeholder-img card-img-top"
                  width="100%"
                  height="225"
                  xmlns="http://www.w3.org/2000/svg"
                  role="img"
                  aria-label="Placeholder: Thumbnail"
                  preserveAspectRatio="xMidYMid slice"
                  focusable="false"
                >
                  <rect width="100%" height="100%" fill="#55595c" />
                  <text x="50%" y="50%" fill="#eceeef" dy=".3em">
                    {{ item.description }}
                  </text>
                </svg>

                <div class="card-body">
                  <h4 class="card-text">
                    {{ item.title }}
                  </h4>
                  <span v-if="item.labels"
                    ><button
                      v-for="(label, index) in item.labels"
                      :key="index"
                      type="button"
                      class="btn btn-secondary btn-sm"
                      style="margin-right: 10px"
                    >
                      {{ label.name }}
                    </button></span
                  >
                  <div class="d-flex justify-content-between">
                    <span>{{ item.description }}</span>
                    <span>点赞数：{{ item.likeCount }}</span>
                    <span
                      class="text-muted author-hover"
                      @click="goUserPage(item)"
                    >
                      |
                      {{ item.author?.name }}</span
                    >
                  </div>
                  <div
                    class="d-flex justify-content-between align-items-center"
                  >
                    <div class="btn-group">
                      <button
                        type="button"
                        class="btn btn-sm btn-outline-secondary"
                        @click="goDetail(item.id)"
                      >
                        查看
                      </button>
                    </div>
                    <small class="text-muted">{{
                      formatUtcString(item.updateTime)
                    }}</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div v-else class="d-flex justify-content-center">
          <div class="fs-2">暂无查询结果😭😭</div>
        </div>
      </div>
    </main>

    <footer class="text-muted py-5">
      <div class="container">
        <p class="float-end mb-1">
          <a href="#">Back to top</a>
        </p>
        <p class="mb-1">@2023</p>
      </div>
    </footer>
  </div>
</template>
<script lang="ts" setup>
import { reactive, ref, onMounted } from 'vue'
import { formatUtcString } from '@/utils/date-format'
import { useMomentStore } from '@/store'
import { useRouter } from 'vue-router'
import { MomentType } from '@/service/main/moment'

const momentStore = useMomentStore()
const listQuery = reactive({
  limit: 9,
  offset: 0,
})
const searchObj = reactive({
  limit: 9,
  offset: 0,
  word: '',
})
let momentList = ref<any>([])
onMounted(() => {
  getLists()
})

// busy代表是否禁用滚动事件
let busy = ref(false)
const loadMore = () => {
  if (searchObj.word) {
    searchObj.offset += 9
    search(false)
  } else {
    listQuery.offset += 9
    getLists()
  }
  busy.value = false
}
const getLists = async () => {
  if (busy.value) {
    // 数据加载完毕
    busy.value = true
  } else {
    // 普通获取列表
    const res = await momentStore.momentListAction(
      listQuery.limit,
      listQuery.offset
    )
    if (res && res?.length !== 0) {
      if (momentList.value.length !== 0) {
        momentList.value = momentList.value.concat(res)
        busy.value = false
      } else {
        momentList.value = res
        busy.value = false
      }
    } else {
      momentList.value = momentList.value.concat(res)
      busy.value = true
    }
  }
}

const getSearchList = async () => {
  const res = await momentStore.searchListAction(searchObj)
  isSearching.value = false
  if (res?.length !== 0) {
    if (momentList.value.length !== 0) {
      momentList.value = momentList.value.concat(res)
      busy.value = false
    } else {
      momentList.value = res
      busy.value = false
    }
  } else {
    momentList.value = momentList.value.concat(res)
    busy.value = true
  }
}
const isSearching = ref(false)
const search = async (isFirst: boolean) => {
  if (!searchObj.word) {
    const res = await momentStore.momentListAction(
      listQuery.limit,
      listQuery.offset
    )
    momentList.value = res
  }
  if (isFirst && searchObj.word) {
    momentList.value = []
    searchObj.offset = 0
    busy.value = false
    if (!isSearching.value) {
      isSearching.value = true
      getSearchList()
    }
  } else {
    if (busy.value && searchObj.word) {
      // 数据加载完毕
      busy.value = true
    } else if (!isSearching.value) {
      isSearching.value = true
      getSearchList()
    }
  }
}
const goDetail = (id: number) => {
  window.open(`/detail/${id}`)
}

const router = useRouter()
const goUserPage = (item: MomentType) => {
  router.push({
    name: 'user',
    params: {
      id: item.author.id,
      author: item.author.name,
      avatar: item.author.avatarURL,
    },
  })
}
</script>

<style scoped lang="less">
.author-hover {
  cursor: pointer;
}
</style>
