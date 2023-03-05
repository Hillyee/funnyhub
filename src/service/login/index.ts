import myRequest from '../index'
import { IAccount, IRegisterResult } from './type'
import { IDataType } from '@/service/type'

export interface UserType {
  id: number
  name: string
  avatarUrl?: string
  email?: string
  sign?: string
}

export const userLoginRequest = (data: IAccount) => {
  return myRequest.post<IDataType>({
    url: '/login',
    data,
  })
}

// 注册
export const userRegisterRequest = (data: IAccount) => {
  return myRequest.post<IRegisterResult>({
    url: '/users',
    data,
  })
}

// 获取当前用户信息
export const currentUserRequest = () => {
  return myRequest.get<IDataType<UserType>>({
    url: '/users/message',
  })
}

// 根据id获取用户信息
export const getUserRequest = (id: string) => {
  return myRequest.get<IDataType<UserType>>({
    url: `/users/${id}/message`,
  })
}
