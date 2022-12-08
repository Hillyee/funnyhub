<template>
  <div class="form-floating">
    <input
      class="form-control"
      v-model="inputRef.val"
      v-bind="$attrs"
      @blur="validateInput"
      :class="{ 'is-invalid': inputRef.error }"
    />
    <label for="floatingInput">{{ label }}</label>
    <div v-if="inputRef.error" class="errortext">{{ inputRef.message }}!!</div>
  </div>
</template>

<script lang="ts" setup>
import {
  defineProps,
  defineEmits,
  defineExpose,
  PropType,
  reactive,
  ref,
  watch,
} from 'vue'
import { RulesProp } from './types'
const props = defineProps({
  modelValue: String,
  rules: {
    type: Array as PropType<RulesProp>,
  },
  label: {
    type: String,
  },
})
const emit = defineEmits(['update:modelValue'])

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
        // case 'password':
        //   passed = passwordReg.test(inputRef.val)
        //   break
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

defineExpose({
  validateInput,
})
</script>

<style scoped>
.errortext {
  color: rgb(212, 75, 75);
  font-size: 14px;
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

.is-invalid {
  margin-bottom: 10px;
}
</style>
