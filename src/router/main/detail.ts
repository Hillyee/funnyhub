// 懒加载路由
const detail = () => import('@/views/main/detail.vue')
export default {
  path: '/detail/:id',
  name: 'detail',
  component: detail,
  children: [],
}
