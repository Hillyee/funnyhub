import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import register from '@/router/register/register'
import detail from '@/router/main/detail'
import editor from '@/router/main/editor'
import user from '@/router/main/user'
import { useGlobalStore } from '@/store'

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
    component: () => import('@/views/main/home.vue'),
  },
  detail,
  register,
  editor,
  user,
]

const router = createRouter({
  routes,
  history: createWebHistory(),
})

router.beforeEach((to, from) => {
  const globalStore = useGlobalStore()
  globalStore.setLoading()
  setTimeout(() => {
    globalStore.setLoading()
  }, 300)

  // if (to.name !== "login") {
  //   const token = LocalCache.getCache("token")
  //   if (!token) {
  //     return { name: "login" }
  //   }
  // }
})

export default router
