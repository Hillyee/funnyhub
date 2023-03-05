const user = () => import('@/views/main/User.vue')

export default {
  path: '/user/:id?',
  name: 'user',
  component: user,
  meta: { requiredLogin: true },
}
