import myRequest from '../index'
import { IDataType } from '@/service/type'

export interface AvatarType {
  filename: string
  mimetype: string
  size: number
  userId: number
  avatarUrl: string
}

export interface UserInfoType {
  id: string
  name: string
  avatarUrl?: string
  email: string
  sign: string
}

export const uploadAvatar = (data: FormData) => {
  return myRequest.post<IDataType<AvatarType>>({
    url: '/upload/avatar',
    data,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
}

export const getUserInfoById = (id: string) => {
  return myRequest.get<IDataType<UserInfoType>>({
    url: `/users/message?id=${id}`,
  })
}

export const updateUserInfo = (data: UserInfoType) => {
  return myRequest.post<IDataType<UserInfoType>>({
    url: '/users/update/user_info',
    data,
  })
}
