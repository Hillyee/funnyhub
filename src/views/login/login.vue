<script lang="ts" setup>
import { ref, reactive } from "vue"
import type { FormInstance } from "element-plus"
import { loginRules } from "./config"
import { useLoginStore } from "../../store"
import { useRouter } from "vue-router"

const formRef = ref<FormInstance>()

const account = reactive({
  name: "",
  password: "",
})
const isRemember = ref(false)

const loginStore = useLoginStore()
const handleLoginClick = () => {
  loginStore.userLoginAction({ ...account }, isRemember.value)
}

const router = useRouter()
// 跳转到注册页面
const handleRegisterClick = () => {
  router.push({
    name: 'register'
  })
}


</script>

<template>
  <div class="login">
    <h2>登录</h2>
    <el-form
      :model="account"
      status-icon
      :rules="loginRules"
      label-width="120px"
      ref="formRef"
    >
      <el-form-item label="Username" prop="pass">
        <el-input v-model="account.name" type="text" />
      </el-form-item>
      <el-form-item label="Password" prop="pass">
        <el-input v-model="account.password" type="password" />
      </el-form-item>
    </el-form>

    <div class="account-control">
      <el-checkbox v-model="isRemember">记住密码</el-checkbox>
      <el-link type="primary" @click="handleRegisterClick">立即注册</el-link>
    </div>

    <el-button type="primary" class="login-btn" @click="handleLoginClick"
      >立即登录</el-button
    >
 </div>
</template>

<style scoped lang="less">
.login {
  width: 500px;
  margin: 100px auto;
  h2 {
    text-align: center;
  }
  .account-control {
    display: flex;
    justify-content: space-between;
  }

  .login-btn {
    width: 100%;
  }
}
</style>
