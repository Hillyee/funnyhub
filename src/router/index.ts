import { createRouter, createWebHashHistory } from "vue-router"
import type { RouteRecordRaw } from "vue-router"
import register from "./register/register"
import detail from "./main/detail/detail"
import editor from "./main/editor/editor"

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    redirect: "/home",
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/login/login.vue"),
  },
  {
    path: "/home",
    name: "home",
    component: () => import("../views/main/home/home.vue"),
  },
  detail,
  register,
  editor,
]

const router = createRouter({
  routes,
  history: createWebHashHistory(),
})

// router.beforeEach((to, from) => {
//   if (to.name !== "login") {
//     const token = LocalCache.getCache("token")
//     if (!token) {
//       return { name: "login" }
//     }
//   }
// })

export default router
