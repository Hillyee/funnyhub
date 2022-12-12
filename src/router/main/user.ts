const user = () => import('@/views/main/user.vue')
export default {
  path: '/user',
  name: 'user',
  component: user,
  children: [],
}
