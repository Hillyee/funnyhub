<template>
  <nav class="navbar navbar-dark bg-dark">
    <div class="container">
      <!-- Navbar content -->
      <a class="navbar-brand" href="#">好好生活-分享专栏</a>
      <ul v-if="!user.isLogin" class="list-inline mb-0">
        <li class="list-inline-item">
          <router-link
            to="/login"
            type="button"
            class="btn btn-outline-light my-2"
            >登录</router-link
          >
        </li>
        <li class="list-inline-item">
          <a href="#" class="btn btn-outline-light my-2">注册</a>
        </li>
      </ul>
      <ul v-else class="list-inline mb-0">
        <li class="list-inline-item">
          <dropdown :title="`你好 ${user.name}`">
            <dropdown-item
              ><a href="#" class="dropdown-item">新建文章</a></dropdown-item
            >
            <dropdown-item
              ><a href="#" class="dropdown-item disabled"
                >编辑资料</a
              ></dropdown-item
            >
            <dropdown-item
              ><a href="#" class="dropdown-item">退出登录</a></dropdown-item
            >
          </dropdown>
        </li>
      </ul>
    </div>
  </nav>
  <!-- <div class="nav-header">
    <el-row class="header-content">
      <el-col :span="3"> <span>FunnyHub</span> </el-col>
      <el-col :span="3" @click="handleHomeClick">
        <span class="editor"
          >首页<img src="@/assets/icon/home.svg" class="span-icon" /></span
      ></el-col>
      <el-col :span="3">
        <span class="editor"
          >热点<img src="@/assets/icon/hot.svg" class="span-icon" /></span
      ></el-col>
      <el-col :span="8"> <el-input placeholder="搜索动态" /></el-col>
      <el-col :span="4" @click="handleEditorClick">
        <span class="editor"
          >写动态<img src="@/assets/icon/editor.svg" class="span-icon" /></span
      ></el-col>
      <el-col :span="3">
        <el-dropdown v-if="token">
          <span class="el-dropdown-link">
            <el-avatar :size="30" :src="userInfo.avatar_url" />
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>个人主页</el-dropdown-item>
              <el-dropdown-item divided>退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
        <span v-else>
          <el-button plain class="loginBtn" @click="handleLoginClick"
            >登录</el-button
          >
        </span>
      </el-col>
    </el-row>
  </div> -->
</template>

<script lang="ts" setup>
import { PropType } from 'vue'
import { useRouter } from 'vue-router'
import { useLoginStore } from '@/store'
import { UserProps } from './types'
const props = defineProps({
  user: {
    type: Object as PropType<UserProps>,
    required: true,
  },
})

const router = useRouter()
const handleHomeClick = () => {
  router.push({
    name: 'home',
  })
}

const handleEditorClick = () => {
  router.push({
    name: 'editor',
  })
}

const loginStore = useLoginStore()
const userInfo = loginStore.userInfo
const token = loginStore.token

const handleLoginClick = () => {
  router.push('/login')
}
</script>

<style scoped lang="less"></style>
