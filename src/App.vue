<template>
  <div>
    <!-- 导航列表 -->
    <global-header :user="userInfo"></global-header>
    <!-- loading -->
    <loader v-if="isLoading"></loader>
    <router-view v-if="isRouterActive"></router-view>
  </div>
</template>

<script lang="ts" setup>
import { computed, watch, ref, nextTick, provide } from 'vue'
import globalHeader from '@/components/GlobalHeader.vue'
import loader from '@/components/loader.vue'
import { useLoginStore, useGlobalStore } from '@/store'
import createMessage from '@/components/createMessage'

const globalStore = useGlobalStore()
const isLoading = computed(() => globalStore.isLoading)

const loginStore = useLoginStore()
const userInfo = computed(() => loginStore.userInfo)

const error = computed(() => globalStore.error)
watch(
  () => error.value.status,
  () => {
    const { status, message } = error.value
    if (status && message) {
      createMessage(message, 'error')
    }
  }
)

const isRouterActive = ref(true)

const reload = () => {
  isRouterActive.value = false
  nextTick(function () {
    isRouterActive.value = true
  })
}
provide('reload', reload)
</script>

<style>
body {
  margin: 0;
  padding: 0;
}
</style>
