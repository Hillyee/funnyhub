<template>
  <div class="input-group mb-3">
    <span class="input-group-text" id="basic-addon1">{{ label }}</span>
    <textarea
      v-if="tag == 'textarea'"
      class="form-control"
      v-model="inputRef.val"
      :aria-label="label"
      aria-describedby="basic-addon1"
      v-bind="$attrs"
      @blur="validateInput"
      :class="{ 'is-invalid': inputRef.error }"
    ></textarea>

    <div class="dropdown" v-else-if="tag == 'select'">
      <select
        class="btn btn-outline-secondary dropdown-toggle mx-2"
        aria-expanded="false"
        v-model="inputRef.val"
      >
        <option
          v-for="(item, index) in selectList"
          :key="index"
          :value="item.name"
          class="dropdown-item"
        >
          {{ item.name }}
        </option>
      </select>
      <button type="button" class="btn btn-link" @click="getLabels">
        获取更多标签
      </button>
    </div>

    <div v-else class="d-flex justify-content-between">
      <input
        type="text"
        class="form-control"
        v-model="inputRef.val"
        :aria-label="label"
        aria-describedby="basic-addon1"
        v-bind="$attrs"
        @blur="validateInput"
        :class="{ 'is-invalid': inputRef.error }"
      />
      <slot></slot>
    </div>
    <div v-if="inputRef.error" class="errortext">{{ inputRef.message }}!!</div>
  </div>
</template>

<script lang="ts" setup>
import { PropType, reactive, watch, onMounted, inject, ref } from 'vue'
import { RulesProp } from './types'
import { labelType } from '@/service/main/label'

export type TagType = 'input' | 'textarea' | 'select'
const props = defineProps({
  modelValue: String,
  rules: {
    type: Array as PropType<RulesProp>,
  },
  label: {
    type: String,
  },
  tag: {
    type: String as PropType<TagType>,
    default: 'input',
  },
  selectList: {
    type: Array as PropType<labelType>,
  },
})
const emit = defineEmits(['update:modelValue', 'getLabelList'])

const inputRef = reactive({
  val: props.modelValue || '',
  error: false,
  message: '',
})

// watch
watch(
  () => props.modelValue,
  () => {
    inputRef.val = props.modelValue as string
  }
)

const selectData = ref<labelType>([])
watch(
  () => props.selectList,
  () => {
    selectData.value = props.selectList as any
  }
)
// 定义规则
const emailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/
// const passwordReg = /^(?=.*[a-z])(?=.*\d)(?=.*\W).{8,12}$/g

const validateInput = () => {
  emit('update:modelValue', inputRef.val)

  if (props.rules) {
    const allPassed = props.rules.every(rule => {
      let passed = true
      inputRef.message = rule.message
      switch (rule.type) {
        case 'required':
          passed = inputRef.val.trim() !== ''
          break
        case 'email':
          passed = emailReg.test(inputRef.val)
          break
        case 'custom':
          passed = rule.validator ? rule.validator() : true
          break
        default:
          break
      }

      return passed
    })
    inputRef.error = !allPassed
    return allPassed
  }
  return true
}
const emitter = inject('emitter') as any
onMounted(() => {
  emitter.emit('form-item-created', validateInput)
})

const getLabels = () => {
  emit('getLabelList')
}
defineExpose({
  validateInput,
})
</script>

<style scoped>
.errortext {
  color: rgb(212, 75, 75);
  font-size: 14px;
  padding-top: 10px;
  padding-left: 10px;
}
.bd-placeholder-img {
  font-size: 1.125rem;
  text-anchor: middle;
  -webkit-user-select: none;
  -moz-user-select: none;
  user-select: none;
}

@media (min-width: 768px) {
  .bd-placeholder-img-lg {
    font-size: 3.5rem;
  }
}

.b-example-divider {
  height: 3rem;
  background-color: rgba(0, 0, 0, 0.1);
  border: solid rgba(0, 0, 0, 0.15);
  border-width: 1px 0;
  box-shadow: inset 0 0.5em 1.5em rgba(0, 0, 0, 0.1),
    inset 0 0.125em 0.5em rgba(0, 0, 0, 0.15);
}

.b-example-vr {
  flex-shrink: 0;
  width: 1.5rem;
  height: 100vh;
}

.bi {
  vertical-align: -0.125em;
  fill: currentColor;
}

.nav-scroller {
  position: relative;
  z-index: 2;
  height: 2.75rem;
  overflow-y: hidden;
}

.nav-scroller .nav {
  display: flex;
  flex-wrap: nowrap;
  padding-bottom: 1rem;
  margin-top: -1px;
  overflow-x: auto;
  text-align: center;
  white-space: nowrap;
  -webkit-overflow-scrolling: touch;
}
</style>
