import { createPinia } from 'pinia'
import { useLoginStore } from './login'
import { useMomentStore } from './main/moment'
import { useGlobalStore } from './global'

const pinia = createPinia()

// 初始化store
export function setupStore() {
  const loginStore = useLoginStore()
  loginStore.loadLoaclLogin()
}

export { useLoginStore, useMomentStore, useGlobalStore }

export default pinia
