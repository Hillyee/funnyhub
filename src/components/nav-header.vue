<script lang="ts" setup>
import { useRouter } from "vue-router"
import { useLoginStore } from "@/store"
const router = useRouter()
const handleHomeClick = () => {
  router.push({
    name: "home",
  })
}

const handleEditorClick = () => {
  router.push({
    name: "editor",
  })
}

const loginStore = useLoginStore()
const userInfo = loginStore.userInfo
const token = loginStore.token

const handleLoginClick = () => {
  router.push('/login')
}
</script>
<template>
  <div class="nav-header">
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
          <el-button plain class="loginBtn" @click="handleLoginClick">登录</el-button>
        </span>
      </el-col>
    </el-row>
  </div>
</template>

<style scoped lang="less">
.nav-header {
  background-color: #004987;
  height: 55px;
  color: #fff;
  font-size: 18px;
  line-height: 55px;
  text-align: center;
  .header-content {
    width: 75%;
    margin: 0 auto;

    span:hover {
      cursor: pointer;
    }

    .editor {
      position: relative;
      .span-icon {
        width: 20px;
        position: relative;
        top: 3px;
        left: 5px;
      }
    }

    .el-avatar {
      margin-top: 13px;
    }

    .loginBtn {
      font-weight: bolder;
    }
  }
}
</style>
