// 普通加载路由
// import register from './register.vue'
// 懒加载路由
const register = () => import('../../views/register/register.vue')
export default {
  path: '/register',
  name: 'register',
  component: register,
  children: [
  ]
}
