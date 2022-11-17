<script lang="ts" setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import navHeader from '@/components/global-header.vue'
import { getMomentByIdRequest } from '@/service/main/moment'

const route = useRoute()
const momentData = ref({})
getMomentByIdRequest(route.params.id as string).then(res => {
  console.log(res.data)
  momentData.value = res.data
})
</script>

<template>
  <div class="detail">
    <nav-header></nav-header>
    <div class="detail-content"></div>
  </div>
</template>

<style scoped lang="less"></style>
