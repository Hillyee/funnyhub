const editor = () => import('@/views/main/Editor.vue')
export default {
  path: '/editor',
  name: 'editor',
  component: editor,
  meta: { requiredLogin: true },
  children: [],
}
