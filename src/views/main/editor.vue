<script lang="ts" setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useMomentStore } from '@/store'
import LocalCache from '@/utils/cache'
import { ElMessage } from 'element-plus'

const content = ref('')
const title = ref('')

const router = useRouter()
const handleGoHomeClick = () => {
  router.push('/home')
}
const momentStore = useMomentStore()
const handlePublicClick = () => {
  const token = LocalCache.getCache('token')
  if (!token) {
    router.push('/login')
  } else if (!content.value || !title.value) {
    console.log('不能为空')
  } else {
    momentStore.momentPublicAction(title.value, content.value)
  }
}
</script>

<template>
  <div class="editor">
    <div class="header">
      <input placeholder="请输入标题..." class="editor-input" v-model="title" />
      <el-button type="primary" size="large" @click="handlePublicClick"
        >发布</el-button
      >
      <el-button type="primary" size="large" plain @click="handleGoHomeClick"
        >返回首页</el-button
      >
      <el-avatar :size="40" />
    </div>
    <!-- 编辑器 -->
    <v-md-editor v-model="content" height="90%" class="md-editor"></v-md-editor>
  </div>
</template>

<style scoped lang="less">
.editor {
  height: 100vh;
  .header {
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 0 30px;
    .el-avatar {
      margin-left: 8px;
    }

    .editor-input {
      flex: 1;
      height: 100%;
      border: 0;
      outline: none;
      font-size: 24px;
      font-weight: 500;
      color: #1d2129;
    }
  }
  .md-editor {
    font-size: 30px;
  }
}
</style>
