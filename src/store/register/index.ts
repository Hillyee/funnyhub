import { defineStore } from "pinia"
import { IRegister } from "../../service/register/type"
import { userRegisterRequest } from '../../service/register'

export const useRegisterStore = defineStore("register", {
  state: () => {
    return {}
  },
  actions: {
    async userRegisterAction(payload: IRegister) {
      const result = await userRegisterRequest(payload)
      console.log(result);
    },
  },
})

