import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import register from '@/router/register/register'
import detail from '@/router/main/detail'
import editor from '@/router/main/editor'
import user from '@/router/main/user'
import setting from '@/router/main/setting'
import { useGlobalStore } from '@/store'
import LocalCache from '@/utils/cache'
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
]

const router = createRouter({
  routes,
  history: createWebHistory(),
})

router.beforeEach((to, from) => {
  const globalStore = useGlobalStore()
  globalStore.setLoading()
  const token = LocalCache.getCache('token')
  if (
    to.path == '/editor' ||
    to.path == '/user/setting' ||
    to.path == '/user'
  ) {
    if (!token) {
      createMessage('请先登录!', 'default')
      setTimeout(() => {
        return { name: 'login' }
      }, 300)
    }
  }
})

export default router
