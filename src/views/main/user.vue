<template>
  <div class="container">
    <main>
      <div class="py-5 text-center" v-if="user">
        <img :src="user?.avatarUrl" class="rounded-circle avatar" alt="头像" />
        <h2>{{ user.name }}</h2>
        <p class="lead">{{ user.sign }}</p>
        <button
          type="button"
          class="btn btn-success btn-sm"
          v-if="isFollow == 1"
          @click="cancelFollow()"
        >
          已关注
        </button>
        <button
          type="button"
          class="btn btn-success btn-sm"
          v-else-if="isFollow == 0"
          @click="addFollow"
        >
          关注
        </button>
        <router-link
          v-if="user.id == currentUser.id"
          to="/user/setting"
          type="button"
          class="btn btn-light"
          >编辑个人资料</router-link
        >
      </div>

      <div class="row g-3">
        <!-- 右侧导航 -->
        <div class="col-md-4 col-lg-3 order-md-last">
          <h4 class="d-flex justify-content-between align-items-center mb-3">
            <span class="text-muted">导航</span>
            <span class="badge bg-secondary rounded-pill">3</span>
          </h4>

          <!-- 右侧导航栏 -->
          <ul class="list-group mb-3">
            <li
              class="list-group-item d-flex justify-content-between lh-sm hover-class"
              @click="goMoment"
            >
              <h6 class="my-1">文章列表</h6>
              <span class="text-muted">{{ momentCount }}</span>
            </li>
            <li
              class="list-group-item d-flex justify-content-between lh-sm hover-class"
              @click="getFollower"
            >
              <h6 class="my-1">关注</h6>
              <span class="text-muted">{{ followerCount }}</span>
            </li>
            <li
              class="list-group-item d-flex justify-content-between lh-sm hover-class"
              @click="getFans"
            >
              <h6 class="my-1">粉丝</h6>
              <span class="text-muted">{{ fansCount }}</span>
            </li>
          </ul>
        </div>
        <!-- 左侧文章列表 -->

        <div class="col-md-8 col-lg-9">
          <h4 class="mb-3">{{ navigation[currentIndex] }}</h4>

          <!-- 关注者 -->
          <div v-if="currentIndex == 1">
            <div
              class="d-flex text-muted pt-3 hover-class"
              v-for="(item, index) in followerList && followerCount !== 0"
              :key="index"
              @click="goUserPage(item.follow.id)"
            >
              <img
                :src="item.follow?.avatarUrl"
                alt=""
                class="bd-placeholder-img flex-shrink-0 me-2 rounded"
                width="32"
                height="32"
              />

              <div class="pb-3 mb-0 small lh-sm border-bottom w-100">
                <div class="d-flex justify-content-between">
                  <strong class="text-gray-dark">{{ item.follow.name }}</strong>
                  <button
                    type="button"
                    class="btn btn-secondary btn-sm"
                    @click="onDeleteClick(item.follow.id)"
                  >
                    已关注
                  </button>
                </div>
                <span class="d-block">个性签名：{{ item.follow.sign }}</span>
              </div>
            </div>
          </div>

          <!-- 粉丝 -->
          <div v-else-if="currentIndex == 2">
            <div
              class="d-flex text-muted pt-3 hover-class"
              v-for="(item, index) in followerList"
              :key="index"
              @click="goUserPage(item.fans.id)"
            >
              <img
                :src="item.fans?.avatarUrl"
                alt=""
                class="bd-placeholder-img flex-shrink-0 me-2 rounded"
                width="32"
                height="32"
              />

              <div class="pb-3 mb-0 small lh-sm border-bottom w-100">
                <div class="d-flex justify-content-between">
                  <strong class="text-gray-dark">{{ item.fans.name }}</strong>
                  <!-- <a href="#">Follow</a> -->
                </div>
                <span class="d-block">个性签名：{{ item.fans.sign }}</span>
              </div>
            </div>
          </div>

          <div v-else class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
            <div class="col" v-for="(item, index) in momentList" :key="item.id">
              <div class="card shadow-sm">
                <img v-if="item.moment_url" :src="item.moment_url" alt="" />
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
                  <text x="10%" y="50%" fill="#eceeef" dy=".3em">
                    {{ item.title }}
                  </text>
                </svg>

                <div class="card-body">
                  <h4 class="card-text">
                    {{ item.title }}
                  </h4>
                  <div class="d-flex justify-content-between">
                    <span>{{ item.description }}</span>
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
                      formatUtcString(item.updateAt)
                    }}</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
    <footer class="my-5 pt-5 text-muted text-center text-small">
      <p class="mb-1">&copy; 2022-2017 اسم الشركة</p>
      <ul class="list-inline">
        <li class="list-inline-item"><a href="#">سياسة الخصوصية</a></li>
        <li class="list-inline-item"><a href="#">اتفاقية الاستخدام</a></li>
        <li class="list-inline-item"><a href="#">الدعم الفني</a></li>
      </ul>
    </footer>

    <modal title="提示" :visible="isVisibleDelete" @model-on-confirm="onConfirm"
      >确定取消关注吗？</modal
    >
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'
import { useFollowerStore, useUserStore, useMomentStore } from '@/store'
import { formatUtcString } from '@/utils/date-format'
import { useRoute, useRouter } from 'vue-router'
import Modal from '@/components/Modal.vue'
const userStore = useUserStore()
const currentUser = computed(() => userStore.userInfo)

const followerStore = useFollowerStore()
const momentStore = useMomentStore()

let momentList = ref()
let momentCount = ref()
let user = ref()
const followerCount = ref()
const fansCount = ref()
const currentIndex = ref(0)
const navigation = ['文章列表', '关注', '粉丝']

const route = useRoute()
const currentUserId = ref()
onMounted(async () => {
  currentUserId.value = route.params.id || currentUser.value.id
  checkFollow()
  user.value = await userStore.getUserAction(currentUserId.value)
  goMoment()
  const res = await followerStore.getFollowerCountAction(currentUserId.value)
  const res2 = await followerStore.getFansCountAction(currentUserId.value)
  followerCount.value = res?.count
  fansCount.value = res2?.count
})

const goDetail = (id: number) => {
  window.open(`/detail/${id}`)
}
const goMoment = async () => {
  currentIndex.value = 0
  const moment = await momentStore.userMomentAction(currentUserId.value)
  momentList.value = moment
  momentCount.value = moment?.length
}
const followerList = ref()
const getFollower = async () => {
  currentIndex.value = 1
  const res = await followerStore.getFollowerListAction(currentUserId.value)
  followerList.value = res
}

const getFans = async () => {
  currentIndex.value = 2
  const res = await followerStore.getFansListAction(currentUserId.value)
  followerList.value = res
}

const cancelFollow = async (followerId: string = '') => {
  const id = followerId || route.params.id
  await followerStore.cancelFollowAction(id)
  checkFollow()
}

const isFollow = ref()
const checkFollow = async () => {
  if (route.params.id == '') {
    isFollow.value = 2
    getFollower()
  } else {
    const res = await followerStore.checkFollowAction(route.params.id)
    isFollow.value = res
  }
}
const addFollow = async () => {
  // 新增关注
  await followerStore.addFollowAction(route.params.id)
  isVisibleDelete.value = false
  setTimeout(() => {
    checkFollow()
  }, 500)
}

// 取消关注
const isVisibleDelete = ref(false)
const deleteId = ref('')
const onDeleteClick = (id: string) => {
  isVisibleDelete.value = true
  deleteId.value = id
}
const onConfirm = () => {
  cancelFollow(deleteId.value)
}

const router = useRouter()
const goUserPage = (id: string) => {
  router.push({
    name: 'user',
    params: { id },
  })
}
</script>

<style scoped lang="less">
.avatar {
  width: 100px;
  height: 100px;
}
.hover-class:hover {
  cursor: pointer;
  background-color: lightgray;
  color: white;
}
</style>
