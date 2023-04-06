import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import register from '@/router/register/register'
import detail from '@/router/main/detail'
import editor from '@/router/main/editor'
import user from '@/router/main/user'
import setting from '@/router/main/setting'
import manage from '@/router/admin/manage'
import { useGlobalStore, useUserStore } from '@/store'
import createMessage from '@/components/createMessage'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/login.vue'),
    meta: { redirectAlreadyLogin: true },
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('@/views/main/Home.vue'),
  },
  detail,
  register,
  editor,
  user,
  setting,
  manage,
]

const router = createRouter({
  routes,
  history: createWebHistory(),
})

router.beforeEach((to, from) => {
  const globalStore = useGlobalStore()
  globalStore.setLoading()
  const userStore = useUserStore()
  const { userInfo, token } = userStore

  const { requiredLogin } = to.meta
  if (!userInfo.isLogin) {
    if (token) {
      // 发送登录请求
      userStore.loadLoaclLogin()
    } else {
      // 没有token
      // requiredLogin参数代表是否需要登录才能访问
      if (requiredLogin) {
        createMessage('请先登录', 'default')
        return { name: 'login' }
      } else {
        return true
      }
    }
  } else {
    return true
  }
})

export default router
