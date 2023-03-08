import { createPinia } from 'pinia'
import { useUserStore } from './user'
import { useMomentStore } from './moment'
import { useGlobalStore } from './global'
import { useCommentStore } from './comment'

const pinia = createPinia()

// 初始化store
export function setupStore() {
  const userStore = useUserStore()
  userStore.loadLoaclLogin()
}

export { useUserStore, useMomentStore, useGlobalStore, useCommentStore }

export default pinia
