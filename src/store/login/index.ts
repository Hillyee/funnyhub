import { defineStore } from 'pinia'
import { userLoginRequest, userRegisterRequest } from '@/service/login/index'
import { IAccount } from '@/service/login/type'
import LocalCache from '@/utils/cache'
import router from '@/router'
import passwordCode from '@/utils/base64'

export const useLoginStore = defineStore('login', {
  state: () => {
    return {
      token: '',
      userInfo: {
        name: '',
        avatar_url: '',
      },
    }
  },
  actions: {
    async userLoginAction(account: IAccount, isRemember: boolean) {
      const result = await userLoginRequest(account)
      const { token, id, name } = result.data
      if (result.code === 200) {
        this.token = token
        this.userInfo = {
          name,
          avatar_url: result.data.userInfo.avatar_url,
        }
        LocalCache.setCache('token', token)
        if (isRemember) {
          const pas = passwordCode.passwordEncode(account.password)
          LocalCache.setCache('password', pas)
          LocalCache.setCache('email', account.email)
        } else {
          LocalCache.removeCache('password')
          LocalCache.removeCache('email')
        }
        router.push('/home')
      }
    },
    async userRegisterAction(account: IAccount) {
      const result = await userRegisterRequest(account)
      if (result.code === 200) {
        router.push('/login')
      }
    },
  },
})
