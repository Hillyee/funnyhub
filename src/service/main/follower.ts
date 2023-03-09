import myRequest from '@/service/index'
import { IDataType } from '../type'

export interface countType {
  count: number
}

export interface FollowType {
  follow: UserType
}
export interface UserType {
  id: number
  name: string
  avatarUrl?: string
  sign?: string
}

// 获取数量
export const followerCountReq = (userId: string | string[]) => {
  return myRequest.get<IDataType<countType>>({
    url: `/follower/${userId}/count`,
  })
}

export const fansCountReq = (followerId: string | string[]) => {
  return myRequest.get<IDataType<countType>>({
    url: `/follower/fans/${followerId}/count`,
  })
}
// 获取关注列表
export const followerListReq = (id: string | string[]) => {
  return myRequest.get<IDataType<FollowType>>({
    url: `/follower/${id}`,
  })
}
// 获取粉丝列表
export const fansListReq = (id: string | string[]) => {
  return myRequest.get<IDataType<FollowType>>({
    url: `/follower/fans/${id}`,
  })
}

export const cancelFollowReq = (followerId: string | string[]) => {
  return myRequest.delete<IDataType>({
    url: `/follower/${followerId}/cancel`,
  })
}

// 查询是否关注
export const checkIsFollowed = (followerId: string | string[]) => {
  return myRequest.get<IDataType<number>>({
    url: `/follower/${followerId}/check`,
  })
}

// 新增关注
export const addFollowReq = (followerId: string | string[]) => {
  return myRequest.post<IDataType>({
    url: '/follower',
    data: { followerId },
  })
}
