<template>
  <div class="text-center">
    <main class="form-signin w-100 m-auto">
      <form>
        <img
          class="mb-4"
          src="@/assets/share.png"
          alt=""
          width="72"
          height="72"
        />
        <h1 class="h3 mb-3 fw-normal">欢迎注册</h1>

        <validate-input
          ref="emailInputRef"
          v-model="emailVal"
          type="email"
          placeholder="name@example.com"
          :rules="emailRules"
          label="邮箱"
        ></validate-input>
        <validate-input
          ref="nameInputRef"
          v-model="nameVal"
          type="text"
          placeholder="name"
          :rules="nameRules"
          label="昵称"
        ></validate-input>
        <validate-input
          ref="passwordInputRef"
          v-model="passwordVal"
          type="password"
          placeholder="Password"
          :rules="passwordRules"
          label="密码"
        ></validate-input>
        <validate-input
          ref="passwordInputRef2"
          v-model="passwordVal2"
          type="password"
          placeholder="Password"
          :rules="passwordRules2"
          label="确认密码"
        ></validate-input>
        <div
          class="w-100 btn btn-lg btn-primary"
          type="submit"
          @click="handleRegisterClick"
        >
          立即注册
        </div>
        <router-link to="/login">返回登录</router-link>
        <p class="mt-5 mb-3 text-muted">&copy; 2022</p>
      </form>
    </main>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import validateInput from '@/components/validate-input.vue'
import { RulesProp } from '@/components/types'
import { useLoginStore } from '@/store'
import { IAccount } from '@/service/login/type'
import '@/style/signin.css'
// 用户名
const nameVal = ref('')
const nameRules: RulesProp = [{ type: 'required', message: '昵称不能为空' }]

// 邮箱
const emailVal = ref('')
const emailRules: RulesProp = [
  { type: 'required', message: '电子邮箱地址不能为空' },
  { type: 'email', message: '请输入正确的电子邮箱格式' },
]

// 密码
const passwordVal = ref('')
const passwordVal2 = ref('')
const passwordRules: RulesProp = [{ type: 'required', message: '密码不能为空' }]
const passwordRules2: RulesProp = [
  { type: 'required', message: '密码不能为空' },
  {
    type: 'custom',
    validator: () => {
      return passwordVal.value === passwordVal2.value
    },
    message: '两次输入的密码不一致',
  },
]

const nameInputRef = ref<any>(null)
const emailInputRef = ref<any>(null)
const passwordInputRef = ref<any>(null)
const passwordInputRef2 = ref<any>(null)
const loginStore = useLoginStore()
const handleRegisterClick = () => {
  // 点击登录先校验一下
  const validateEmailRes = emailInputRef.value.validateInput()
  const validatePawRes = passwordInputRef.value.validateInput()
  const validateNameRes = nameInputRef.value.validateInput()
  if (validateEmailRes && validatePawRes && validateNameRes) {
    const account: IAccount = {
      name: nameVal.value,
      email: emailVal.value,
      password: passwordVal.value,
    }
    loginStore.userRegisterAction(account)
  }
}
</script>

<style scoped lang="less"></style>
