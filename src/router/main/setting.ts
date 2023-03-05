const setting = () => import('@/views/main/setting.vue')

export default {
  path: '/user/setting',
  name: 'setting',
  component: setting,
  meta: { requiredLogin: true },
  children: [],
}
