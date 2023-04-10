<template>
  <div class="d-flex flex-nowrap">
    <main class="d-flex flex-nowrap">
      <div
        class="d-flex flex-column p-3 text-bg-dark fs-5"
        style="width: 280px; height: 91vh"
      >
        <div
          class="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none"
        >
          <svg class="bi pe-none me-2" width="40" height="32">
            <use xlink:href="#bootstrap" />
          </svg>
          <span class="fs-4">管理菜单</span>
        </div>
        <hr />
        <ul class="nav nav-pills flex-column mb-auto">
          <li class="nav-item" v-for="(item, index) in menu" :key="index">
            <router-link
              :to="item.path"
              class="nav-link"
              @click="changeCurrentIndex(item, menu)"
              :class="{ active: $route.path === item.path }"
            >
              <svg class="bi pe-none me-2" width="16" height="16">
                <use xlink:href="#home" />
              </svg>
              {{ item.name }}
            </router-link>
          </li>
        </ul>
        <hr />
      </div>
      <!-- 主题内容 -->
      <router-view />
    </main>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'

interface menuType {
  path: string
  name: string
  isChecked: number
}
const menu = reactive([
  { path: '/manage/user', name: '用户管理', isChecked: 1 },
  { path: '/manage/label', name: '标签管理', isChecked: 0 },
  { path: '/manage/moment', name: '文章管理', isChecked: 0 },
])
const changeCurrentIndex = (current: menuType, menu: menuType[]) => {
  // 先把所有高亮去掉
  menu.forEach(item => {
    item.isChecked = 0
  })
  // 点击的那一项高亮
  current.isChecked = 1
}
</script>

<style lang="scss" scoped></style>
