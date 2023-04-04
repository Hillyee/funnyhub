<template>
  <div class="text-center">
    <main class="m-auto px-4 py-3 my-5 col-lg-6 form-signin max-w-200 m-auto">
      <h1 class="h3 mb-3 fw-normal">欢迎注册</h1>
      <validate-form @form-submit="onFormSubmit">
        <img
          class="mb-4"
          src="@/assets/share.png"
          alt=""
          width="72"
          height="72"
        />

        <validate-input
          class="w-100"
          :rules="emailRules"
          v-model="emailVal"
          label="邮箱"
        />
        <validate-input :rules="nameRules" v-model="nameVal" label="昵称" />
        <validate-input
          :rules="passwordRules"
          v-model="passwordVal"
          type="password"
          label="密码"
        />
        <validate-input
          v-model="passwordVal2"
          type="password"
          :rules="passwordRules2"
          label="确认密码"
        ></validate-input>
        <template #submit>
          <button type="submit" class="w-100 btn btn-lg btn-primary">
            立即注册
          </button>
        </template>
      </validate-form>
      <router-link to="/login">返回登录</router-link>
      <p class="mt-5 mb-3 text-muted">&copy; 2022</p>
    </main>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import ValidateInput from '@/components/ValidateInput.vue'
import ValidateForm from '@/components/ValidateForm.vue'
import { RulesProp } from '@/components/types'
import { useUserStore } from '@/store'
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

const loginStore = useUserStore()

const onFormSubmit = (result: boolean) => {
  // 提交
  if (result) {
    // 验证通过
    const account: IAccount = {
      name: nameVal.value,
      email: emailVal.value,
      password: passwordVal.value,
    }
    loginStore.userRegisterAction(account)
  }
}
</script>

<style scoped lang="less">
.form-signin {
  max-width: 500px;
}
</style>
