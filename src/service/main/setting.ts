import myRequest from '../index'
import { IDataType } from '@/service/type'

export interface AvatarType {
  filename: string
  mimetype: string
  size: number
  userId: number
  avatarUrl: string
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
