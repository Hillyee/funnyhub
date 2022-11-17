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
        <validate-input
          v-model="emailVal"
          type="email"
          placeholder="name@example.com"
          :rules="emailRules"
          label="邮箱"
        ></validate-input>
        <div class="form-floating">
          <input
            type="password"
            class="form-control"
            id="floatingPassword"
            placeholder="Password"
            v-model="account.password"
          />
          <label for="floatingPassword">密码</label>
        </div>

        <div class="checkbox mb-3">
          <label>
            <input type="checkbox" value="remember-me" /> 记住密码
          </label>
        </div>
        <button
          class="w-100 btn btn-lg btn-primary"
          type="submit"
          @click="handleLoginClick"
        >
          立即登录
        </button>
        <p class="mt-5 mb-3 text-muted">&copy; 2022</p>
      </form>
    </main>
  </div>
</template>
<script lang="ts" setup>
import { ref, reactive } from 'vue'
import type { FormInstance } from 'element-plus'
import { loginRules } from './config'
import { useLoginStore } from '../../store'
import { useRouter } from 'vue-router'
import '@/style/signin.css'
import validateInput from '@/components/validate-input.vue'
import { RulesProp } from '@/components/types'

const formRef = ref<FormInstance>()

const account = reactive({
  name: '',
  password: '',
})
const isRemember = ref(false)

const loginStore = useLoginStore()
const handleLoginClick = () => {
  console.log(account)

  // loginStore.userLoginAction({ ...account }, isRemember.value)
}

const router = useRouter()
// 跳转到注册页面
const handleRegisterClick = () => {
  router.push({
    name: 'register',
  })
}

// 邮箱
const emailVal = ref('')
const emailRules: RulesProp = [
  { type: 'required', message: '电子邮箱地址不能为空' },
  { type: 'email', message: '请输入正确的电子邮箱格式' },
]
</script>

<style scoped lang="less">
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
