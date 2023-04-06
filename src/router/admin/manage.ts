// 懒加载路由
const manage = () => import('@/views/admin/Manage.vue')
const label = () => import('@/views/admin/LabelManage.vue')
const moment = () => import('@/views/admin/MomentManage.vue')
const user = () => import('@/views/admin/UserManage.vue')
export default {
  path: '/manage',
  name: 'manage',
  component: manage,
  children: [
    {
      path: '/manage/label',
      component: label,
    },
    {
      path: '/manage/moment',
      component: moment,
    },
    {
      path: '/manage/user',
      component: user,
    },
  ],
}
