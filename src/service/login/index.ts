import myRequest from '../index'
import { IAccount, ILoginResult, IRegisterResult } from './type'

export const userLoginRequest = (data: IAccount) => {
  return myRequest.post<ILoginResult>({
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
