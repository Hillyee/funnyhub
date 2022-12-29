<template>
  <form class="validate-form-container">
    <slot name="default"></slot>
    <div class="submit-area" @click.prevent="submitForm">
      <slot name="submit">
        <button type="submit" class="btn btn-primary">提交</button>
      </slot>
    </div>
  </form>
</template>

<script setup lang="ts">
import { onUnmounted, provide } from 'vue'
import mitt from 'mitt'

type ValidateFunc = () => boolean

const emit = defineEmits(['form-submit'])

const emitter = mitt()
provide('emitter', emitter)
let funcArr: ValidateFunc[] = []
const callback = (func?: any) => {
  if (func) {
    funcArr.push(func)
  }
}
emitter.on('form-item-created', callback)
const submitForm = () => {
  const result = funcArr.map(func => func()).every(result => result)
  emit('form-submit', result)
}

onUnmounted(() => {
  emitter.off('form-item-created', callback)
  funcArr = []
})

defineExpose({
  emitter,
})
</script>

<style scoped></style>
