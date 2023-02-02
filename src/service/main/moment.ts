import myRequest from '@/service/index'
import { IDataType } from '../type'

export interface momentListResult {
  code: number
  data?: DataEntity[] | null
}
export interface DataEntity {
  id: number
  title: string | null
  content: string
  createTime: string
  updateTime: string
  author: Author
  labels?: LabelsEntity[] | null
  images?: string[] | null
}
export interface Author {
  id: number
  name: string
  avatarURL?: string | null
}
export interface LabelsEntity {
  id: number
  name: string
}

export interface IPictureType {
  url: string
}
export interface uploadPicResult {
  code: number
  message: string
  data: IPictureType
}
export interface momentType {
  id: number
}

export interface userMomentType {
  id: number
  content: string
  user_id: number
  createAt: string
  updateAt: string
  title: string
  description: string
  moment_url: string
}
export interface IUserMomentData {
  code: number
  data?: userMomentType[] | null
}

// 发布动态封面
export const momentPicture = (data: FormData) => {
  return myRequest.post<IDataType<IPictureType>>({
    url: `/upload/picture`,
    data,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
}

// 发布动态
export const momentPublicRequest = (
  title: string,
  content: any,
  description: string,
  momentUrl: string
) => {
  return myRequest.post<IDataType<momentType>>({
    url: '/moment',
    data: {
      title,
      content,
      description,
      momentUrl,
    },
  })
}

// 获取某用户动态
export const userMomentRequset = (userId: number) => {
  return myRequest.get<IUserMomentData>({
    url: `/moment/${userId}/list`,
  })
}

export const momentListRequest = (limit: number, offset: number) => {
  return myRequest.get<momentListResult>({
    url: `/moment`,
    params: {
      limit,
      offset,
    },
  })
}

// 获取某条动态

export interface Data {
  id: number
  content: string
  title: string
  description: string
  createTime: string
  updateTime: string
  author: Author
  labels?: LabelsEntity[] | null
  images?: null
}
export interface Author {
  id: number
  name: string
  avatarURL?: string | null | undefined
}
export interface LabelsEntity {
  id: number
  name: string
}

export const getMomentByIdRequest = (id: string) => {
  return myRequest.get<IDataType>({
    url: `/moment/${id}`,
  })
}
