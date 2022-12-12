<template>
  <teleport to="#back">
    <div
      class="d-flex justify-content-center align-items-center h-100 w-100 loading-container"
      :style="{ backgroundColor: background || '' }"
    >
      <div class="text-center">
        <div class="spinner-border" role="status">
          <span class="visually-hidden">{{ text }}</span>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue'
import useDOMCreate from '@/utils/useDOMCreate'
const props = defineProps({
  text: {
    type: String,
    default: 'loading',
  },
  background: {
    type: String,
  },
})

useDOMCreate('back')
</script>

<style scoped>
.loading-container {
  background: rgba(234, 234, 234, 0.5);
  z-index: 100;
  position: fixed;
  top: 0;
  left: 0;
}
.loading-container {
  text-align: center;
}
</style>
