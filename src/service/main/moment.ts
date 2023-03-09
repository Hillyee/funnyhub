import myRequest from '@/service/index'
import { IDataType } from '../type'

// 动态类型
export interface MomentType {
  id: number
  title: string
  content: string
  description?: string | null
  createTime: string
  updateTime: string
  momentUrl?: string
  author: Author
  labels?: LabelsEntity[] | null
  images?: string[] | null
}
export interface Author {
  id: number
  name: string
  avatarURL?: string
}
export interface LabelsEntity {
  id: number
  name: string
}

// 动态封面
export interface IPictureType {
  url: string
}
export interface uploadPicResult {
  code: number
  message: string
  data: IPictureType
}

// 搜索类型
export interface queryObject {
  limit: number
  offset: number
  word: string
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
  return myRequest.post<IDataType<MomentType>>({
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
export const userMomentRequset = (userId: string | string[]) => {
  return myRequest.get<IDataType<MomentType[]>>({
    url: `/moment/${userId}/list`,
  })
}

// 获取所有动态
export const getMomentListRequest = (limit: number, offset: number) => {
  return myRequest.get<IDataType<MomentType[]>>({
    url: `/moment`,
    params: {
      limit,
      offset,
    },
  })
}

// 搜索动态
export const searchMomentListReq = (query: queryObject) => {
  const { limit, offset, word } = query
  return myRequest.post<IDataType<MomentType[]>>({
    url: `/moment/fuzzy`,
    params: {
      limit,
      offset,
      word,
    },
  })
}

// 获取某条动态详情
export const getMomentByIdRequest = (id: string) => {
  return myRequest.get<IDataType<MomentType>>({
    url: `/moment/${id}`,
  })
}

// 修改某条动态
export const updateMomentRequest = (
  id: string | string[],
  title: string,
  content: any,
  description: string,
  momentUrl: string
) => {
  return myRequest.patch<IDataType>({
    url: `/moment/${id}`,
    data: {
      title,
      content,
      description,
      momentUrl,
    },
  })
}

// 删除动态
export const deleteMomentRequest = (id: number | string | string[]) => {
  return myRequest.delete<IDataType>({
    url: `/moment/${id}`,
  })
}
