<template>
  <div class="container">
    <main>
      <div class="py-5 text-center">
        <img
          :src="userInfo.avatarUrl"
          class="rounded-circle avatar"
          alt="头像"
        />
        <h2>{{ userInfo.name }}</h2>
        <p class="lead">好好学习天天向上（个性签名）</p>
        <router-link to="/user/setting" type="button" class="btn btn-light"
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
            <li class="list-group-item d-flex justify-content-between lh-sm">
              <h6 class="my-1">文章列表</h6>
              <span class="text-muted">{{ count }}</span>
            </li>
            <li class="list-group-item d-flex justify-content-between lh-sm">
              <h6 class="my-1">关注了</h6>
              <span class="text-muted">0</span>
            </li>
            <li class="list-group-item d-flex justify-content-between lh-sm">
              <h6 class="my-1">粉丝</h6>
              <span class="text-muted">5</span>
            </li>
          </ul>
        </div>
        <!-- 左侧文章列表 -->

        <div class="col-md-8 col-lg-9">
          <h4 class="mb-3">文章列表</h4>
          <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
            <div class="col" v-for="(item, index) in momentList" :key="item.id">
              <div class="card shadow-sm">
                <svg
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
                  <p class="card-text">
                    {{ item.description }}
                  </p>
                  <div
                    class="d-flex justify-content-between align-items-center"
                  >
                    <div class="btn-group">
                      <button
                        type="button"
                        class="btn btn-sm btn-outline-secondary"
                        @click="goDetail(item.id)"
                      >
                        View
                      </button>
                      <button
                        type="button"
                        class="btn btn-sm btn-outline-secondary"
                      >
                        Edit
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
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, nextTick } from 'vue'
import { useUserStore, useMomentStore } from '@/store'
import { userMomentRequset, IUserMomentData } from '@/service/main/moment'
import { formatUtcString } from '@/utils/date-format'
import router from '@/router'
const loginStore = useUserStore()
const userInfo = computed(() => loginStore.userInfo)

let momentList = ref()
let count = ref()
userMomentRequset(userInfo.value.id).then(res => {
  momentList.value = res.data
  count.value = res.data?.length
})

const goDetail = (id: number) => {
  router.push({
    path: `/detail${id}`,
  })
}
</script>

<style scoped lang="less">
.avatar {
  width: 100px;
  height: 100px;
}
</style>
