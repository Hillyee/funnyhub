<script lang="ts" setup>
import { reactive } from "vue"
import { registerRules } from "./config"
import { useRouter } from "vue-router"
import { useRegisterStore } from "../../store"

const newAccount = reactive({
  name: "",
  password: "",
})

const router = useRouter()
const registerStore = useRegisterStore()
const handleRegisterClick = () => {
  registerStore.userRegisterAction(newAccount)
  router.push({
    name: "login",
  })
}

const handleGoBackClick = () => {
  router.push({
    name: "login",
  })
}
</script>

<template>
  <div class="register">
    <h2>注册</h2>
    <el-form
      :model="newAccount"
      status-icon
      :rules="registerRules"
      label-width="120px"
      ref="formRef"
    >
      <el-form-item label="Username" prop="pass">
        <el-input v-model="newAccount.name" type="text" />
      </el-form-item>
      <el-form-item label="Password" prop="pass">
        <el-input v-model="newAccount.password" type="password" />
      </el-form-item>
    </el-form>
    <el-link type="primary" @click="handleGoBackClick">返回登录</el-link>

    <el-button type="primary" class="btn" @click="handleRegisterClick"
      >立即注册</el-button
    >
  </div>
</template>

<style scoped lang="less">
.register {
  width: 500px;
  margin: 100px auto;
  h2 {
    text-align: center;
  }
  .btn {
    width: 100%;
  }
}
</style>
