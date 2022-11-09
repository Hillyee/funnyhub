import { createPinia } from "pinia"
import { useLoginStore } from "./login"
import { useRegisterStore } from "./register"
import { useMomentStore } from "./main/moment"

const pinia = createPinia()

export { useLoginStore, useRegisterStore, useMomentStore }

export default pinia
