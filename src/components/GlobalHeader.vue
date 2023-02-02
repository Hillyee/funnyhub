<template>
  <header v-if="user.isLogin">
    <div class="collapse bg-dark" id="navbarHeader">
      <div class="container">
        <div class="row">
          <div class="col-sm-8 col-md-7 py-4">
            <h4 class="text-white">About</h4>
            <p class="text-muted">Happy every day</p>
          </div>
          <div class="col-sm-4 offset-md-1 py-4">
            <ul class="list-unstyled fs-5">
              <li>
                <button class="btn btn-link text-white fs-5">编写文章</button>
              </li>
              <li>
                <button class="btn btn-link text-white fs-5">个人主页</button>
              </li>
              <li>
                <button
                  class="btn btn-link text-white fs-5"
                  @click="handleLogout"
                >
                  退出登录
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="navbar navbar-dark bg-dark shadow-sm">
      <div class="container">
        <img :src="user.avatarUrl" class="rounded-circle avatar" alt="头像" />
        <a href="#" class="navbar-brand d-flex align-items-center">
          <strong>Welcome back！{{ user.name }}🌞</strong>
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarHeader"
          aria-controls="navbarHeader"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
      </div>
    </div>
  </header>
  <header v-else class="navbar navbar-dark bg-dark">
    <div class="container">
      <router-link to="/home" class="navbar-brand" href="#"
        >好好生活-分享专栏</router-link
      >
      <ul class="list-inline mb-0">
        <li class="list-inline-item">
          <router-link
            to="/login"
            type="button"
            class="btn btn-outline-light my-2"
            >登录</router-link
          >
        </li>
        <li class="list-inline-item">
          <router-link
            to="/register"
            type="button"
            class="btn btn-outline-light my-2"
            >注册</router-link
          >
        </li>
      </ul>
    </div>
  </header>
</template>

<script lang="ts" setup>
import { PropType } from 'vue'
import { UserProps } from './types'
import { useUserStore, useGlobalStore } from '@/store'
const props = defineProps({
  user: {
    type: Object as PropType<UserProps>,
    required: true,
  },
})
const loginStore = useUserStore()
const globalStore = useGlobalStore()
const handleLogout = () => {
  globalStore.setLoading()
  loginStore.logout()
}
</script>

<style scoped lang="less">
.avatar {
  width: 50px;
  height: 50px;
}
</style>
