import { createPinia } from 'pinia'
import { useUserStore } from './user'
import { useMomentStore } from './main/moment'
import { useGlobalStore } from './global'

const pinia = createPinia()

// 初始化store
export function setupStore() {
  const userStore = useUserStore()
  userStore.loadLoaclLogin()
}

export { useUserStore, useMomentStore, useGlobalStore }

export default pinia
