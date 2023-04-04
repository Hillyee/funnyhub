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
        <h1 class="h3 mb-3 fw-normal">欢迎登录</h1>
        <validate-form @form-submit="onFormSubmit">
          <validate-input
            v-model="emailVal"
            type="email"
            :rules="emailRules"
            label="邮箱"
          ></validate-input>
          <validate-input
            v-model="passwordVal"
            type="password"
            :rules="passwordRules"
            label="密码"
          ></validate-input>

          <template #submit>
            <div class="w-100 btn btn-lg btn-primary">立即登录</div>
          </template></validate-form
        >

        <div class="checkbox mb-3">
          <label>
            <input type="checkbox" v-model="isRemember" />
            记住密码
          </label>
        </div>

        <router-link to="/register">首次使用？点我注册</router-link>
        <p class="mt-5 mb-3 text-muted">&copy; 2023</p>
      </form>
    </main>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { useUserStore } from '@/store'
import '@/style/signin.css'
import validateInput from '@/components/ValidateInput.vue'
import ValidateForm from '@/components/ValidateForm.vue'
import { RulesProp } from '@/components/types'
import { IAccount } from '@/service/login/type'
import LocalCache from '@/utils/cache'
import passwordCode from '@/utils/base64'

// 页面加载判断storage有无记住密码
onMounted(() => {
  const everRemember = LocalCache.getCache('password')
  if (everRemember) {
    isRemember.value = true
    // 解密
    const pass = passwordCode.passwordDecode(everRemember)
    const email = LocalCache.getCache('email')
    passwordVal.value = pass
    emailVal.value = email || ''
  }
})

// 邮箱
const emailVal = ref('')
const emailRules: RulesProp = [
  { type: 'required', message: '电子邮箱地址不能为空' },
  { type: 'email', message: '请输入正确的电子邮箱格式' },
]

// 密码
const passwordVal = ref('')
const passwordRules: RulesProp = [{ type: 'required', message: '密码不能为空' }]

// 记住密码
const isRemember = ref(false)

const loginStore = useUserStore()
// const handleLoginClick = () => {
//   // 点击登录先校验一下
//   const validateEmailRes = emailInputRef.value.validateInput()
//   const validatePawRes = passwordInputRef.value.validateInput()
//   if (validateEmailRes && validatePawRes) {
//     const account: IAccount = {
//       email: emailVal.value,
//       password: passwordVal.value,
//     }
//     loginStore.userLoginAction(account, isRemember.value)
//   }
// }

const onFormSubmit = (result: boolean) => {
  // 提交
  if (result) {
    // 验证通过
    const account: IAccount = {
      email: emailVal.value,
      password: passwordVal.value,
    }
    loginStore.userLoginAction(account, isRemember.value)
  }
}
</script>

<style scoped lang="less"></style>
