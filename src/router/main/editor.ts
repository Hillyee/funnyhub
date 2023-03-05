const editor = () => import('@/views/main/Editor.vue')
export default {
  path: '/editor/:id?',
  name: 'editor',
  component: editor,
  meta: { requiredLogin: true },
  children: [],
}
