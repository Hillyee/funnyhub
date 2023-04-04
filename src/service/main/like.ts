import myRequest from '@/service/index'
import { IDataType } from '../type'

export const getLikeStatus = (momentId: string) => {
  return myRequest.get<IDataType<number>>({
    url: `/like/${momentId}/status`,
  })
}

// 新增点赞
export const addLike = (momentId: string, beUserId: string) => {
  return myRequest.post<IDataType>({
    url: `/like`,
    data: {
      momentId,
      beUserId,
    },
  })
}

// 取消点赞
export const cancelLike = (momentId: string, beUserId: string) => {
  return myRequest.delete<IDataType>({
    url: `/like`,
    data: {
      momentId,
      beUserId,
    },
  })
}
