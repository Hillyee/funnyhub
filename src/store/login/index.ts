import { defineStore } from "pinia"
import { userLoginRequest } from "../../service/login/index"
import { IAccount } from "../../service/login/type"
import LocalCache from "../../utils/cache"
import router from "@/router"

export const useLoginStore = defineStore("login", {
  state: () => {
    return {
      token: "",
      userInfo: {
        name: "",
        avatar_url: "",
      },
    }
  },
  actions: {
    async userLoginAction(account: IAccount, isRemember: boolean) {
      const result = await userLoginRequest(account)
      console.log(result)
      const { token, id, name } = result.data
      if (result.code === 200) {
        this.token = token
        this.userInfo = {
          name,
          avatar_url: result.data.userInfo.avatar_url,
        }
        LocalCache.setCache("token", token)
        if (isRemember) {
          LocalCache.setCache("password", account.password)
        }
        router.push("/home")
      }
    },
  },
})
