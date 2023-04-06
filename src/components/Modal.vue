<template>
  <teleport to="#modal">
    <div class="modal d-block" tabindex="-1" v-if="visible">
      <div class="modal-dialog" :class="{ 'modal-lg': bigModal }">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{ title }}</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true" @click="onClose"></span>
            </button>
          </div>
          <div class="modal-body">
            <slot></slot>
          </div>
          <div class="modal-footer">
            <slot name="btn">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
                @click="onClose"
              >
                取消
              </button>
              <button type="button" class="btn btn-primary" @click="onConfirm">
                确定
              </button>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </teleport>
</template>
<script lang="ts" setup>
import useDOMCreate from '@/utils/useDOMCreate'
const props = defineProps({
  title: String,
  visible: {
    type: Boolean,
    default: false,
  },
  bigModal: {
    type: Boolean,
    default: false,
  },
})
const emits = defineEmits(['model-on-close', 'model-on-confirm'])
useDOMCreate('modal')
const onClose = () => {
  emits('model-on-close')
}
const onConfirm = () => {
  emits('model-on-confirm')
}
</script>

<style scoped lang="less"></style>
