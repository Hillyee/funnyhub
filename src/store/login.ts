import { defineStore } from 'pinia'
import { userLoginRequest, userRegisterRequest } from '@/service/login/index'
import { IAccount } from '@/service/login/type'
import LocalCache from '@/utils/cache'
import router from '@/router'
import passwordCode from '@/utils/base64'
import createMessage from '@/components/createMessage'

export interface IUserInfo {
  isLogin: boolean
  id: number
  name: string
  avatar_url?: string
  email: string
  token: string
}

export const useLoginStore = defineStore('login', {
  state: () => {
    return {
      token: '',
      userInfo: {
        isLogin: false,
      } as IUserInfo,
    }
  },
  actions: {
    async userLoginAction(account: IAccount, isRemember: boolean) {
      const result = await userLoginRequest(account)

      if (result.code === 200) {
        const { token, id } = result.data
        this.token = token
        this.userInfo = { ...result.data, isLogin: true }
        LocalCache.setCache('token', token)
        LocalCache.setCache('userInfo', JSON.stringify(this.userInfo))
        if (isRemember) {
          const pas = passwordCode.passwordEncode(account.password)
          LocalCache.setCache('password', pas)
          LocalCache.setCache('email', account.email)
        } else {
          LocalCache.removeCache('password')
          LocalCache.removeCache('email')
        }
        createMessage('登录成功 2秒后跳转首页', 'success')
        setTimeout(() => {
          router.push('/home')
        }, 2000)
      }
    },
    async userRegisterAction(account: IAccount) {
      const result = await userRegisterRequest(account)
      if (result.code === 200) {
        createMessage('注册成功', 'success')
        setTimeout(() => {
          router.push('/login')
        }, 2000)
      }
    },
    loadLoaclLogin() {
      const token = LocalCache.getCache('token')
      if (token) {
        this.token = token
      }

      const userInfo = LocalCache.getCache('userInfo')
      if (userInfo) {
        this.userInfo = JSON.parse(userInfo)
      }
    },
    logout() {
      this.userInfo.isLogin = false
      this.token = ''
      LocalCache.removeCache('token')
      LocalCache.removeCache('userInfo')
    },
    updateUserAvatar(url: string) {
      this.userInfo.avatar_url = url
      LocalCache.setCache('userInfo', JSON.stringify(this.userInfo))
    },
  },
})
