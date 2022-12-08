import { createPinia } from 'pinia'
import { useLoginStore } from './login'
import { useMomentStore } from './main/moment'

const pinia = createPinia()

export { useLoginStore, useMomentStore }

export default pinia
