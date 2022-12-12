import myRequest from '../index'
import { IAccount, IRegisterResult } from './type'
import { IDataType } from '@/service/type'

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
