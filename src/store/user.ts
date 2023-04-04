import { defineStore } from 'pinia'
import {
  userLoginRequest,
  userRegisterRequest,
  currentUserRequest,
  getUserRequest,
} from '@/service/login/index'
import { IAccount } from '@/service/login/type'
import LocalCache from '@/utils/cache'
import router from '@/router'
import passwordCode from '@/utils/base64'
import createMessage from '@/components/createMessage'
import { UserInfoType } from '@/service/main/setting'
import { updateUserInfo } from '@/service/main/setting'
import { UserProps } from '@/components/types'

export const useUserStore = defineStore('user', {
  state: () => {
    return {
      token: LocalCache.getCache('token') || '',
      userInfo: {
        isLogin: false,
      } as UserProps,
    }
  },
  actions: {
    async userLoginAction(account: IAccount, isRemember: boolean) {
      const result = await userLoginRequest(account)

      if (result?.code === 200) {
        const { token } = result.data
        this.token = token
        LocalCache.setCache('token', token)
        if (isRemember) {
          const pas = passwordCode.passwordEncode(account.password)
          LocalCache.setCache('password', pas)
          LocalCache.setCache('email', account.email)
        } else {
          LocalCache.removeCache('password')
          LocalCache.removeCache('email')
        }
        await this.getCurrentUser()
        createMessage('登录成功 2秒后跳转首页', 'success')
        setTimeout(() => {
          router.push('/home')
        }, 2000)
      }
    },
    async getCurrentUser() {
      const res = await currentUserRequest()
      if (res?.code == 200) {
        this.userInfo = { isLogin: true, ...res.data }
      } else {
        return false
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
        this.getCurrentUser()
      }
    },
    logout() {
      this.userInfo.isLogin = false
      this.token = ''
      LocalCache.removeCache('token')
    },
    updateUserAvatar(url: string) {
      this.userInfo = { ...this.userInfo, ...{ avatar_url: url } }
    },
    async updateUserAction(data: UserInfoType) {
      const res = await updateUserInfo(data)
      if (res.code == 200) {
        createMessage('更新成功', 'success', 3000)
        router.push('/user')
      } else {
        createMessage('更新失败', 'error', 3000)
      }
    },
    async getUserAction(id: string | string[]) {
      const res = await getUserRequest(id)
      return res.data
    },
  },
})
