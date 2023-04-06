import myRequest from '../index'
import { IDataType } from '@/service/type'
export interface Data<T> {
  count: number
  rows?: T | null
}

export interface UserType {
  id: string
  name: string
  email: string
  avatarUrl: string
  sign: string
  createAt: string
  updateAt: string
}
export interface LabelType {
  id: string
  name: string
  createAt: string
  updateAt: string
}
export const getAllUserReq = (limit: number, offset: number) => {
  return myRequest.get<IDataType<Data<UserType[]>>>({
    url: `/users?limit=${limit}&offset=${offset}`,
  })
}
export const getAllLabelsReq = (limit: number, offset: number) => {
  return myRequest.get<IDataType<Data<LabelType[]>>>({
    url: `/label?limit=${limit}&offset=${offset}`,
  })
}

export const getMomentCountReq = () => {
  return myRequest.get<IDataType<number>>({
    url: `/moment/count`,
  })
}

// 删除动态
export const deleteMomentReqAd = (id: number | string | string[]) => {
  return myRequest.delete<IDataType>({
    url: `/moment/admin/${id}`,
  })
}

// 删除标签
export const deleteLabelReqAd = (id: string | string[]) => {
  return myRequest.delete<IDataType>({
    url: `/label/admin/${id}`,
  })
}
