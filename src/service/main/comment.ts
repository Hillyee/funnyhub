import myRequest from '@/service/index'
import { IDataType } from '../type'

export interface CommentType {
  id: string
  content: string
  momentId: number
  commentId?: null
  userId: number
  updateAt: string
  reviewer: ReviewerType
  replyUser?: ReplyUserType
}
export interface ReviewerType {
  name: string
  avatarUrl: string
  createAt: string
  updateAt: string
}
export interface ReplyUserType {
  name: string
  createAt: string
  updateAt: string
}
export const getCommentsReq = (
  momentId: string | string[],
  limit: number = 9,
  offset: number = 0
) => {
  return myRequest.get<IDataType<CommentType[]>>({
    url: `/comment`,
    params: {
      momentId,
      limit,
      offset,
    },
  })
}
export const getReplyReq = (
  momentId: string | string[],
  commentId: string,
  limit: number = 9,
  offset: number = 0
) => {
  return myRequest.get<IDataType<CommentType[]>>({
    url: `/comment/reply`,
    params: {
      momentId,
      commentId,
      limit,
      offset,
    },
  })
}

export const addCommentReq = (momentId: string, content: string) => {
  return myRequest.post<IDataType>({
    url: `/comment`,
    data: {
      momentId,
      content,
    },
  })
}

export interface addReplyType {
  momentId: string
  commentId: string
  content: string
  beUserId: string
}
export const addReplyReq = (query: addReplyType) => {
  const { momentId, content, beUserId, commentId } = query
  console.log(momentId, content, beUserId, commentId)
  return myRequest.post<IDataType>({
    url: `/comment/${commentId}/reply`,
    data: {
      momentId,
      content,
      beUserId,
    },
  })
}
export const deleteCommentReq = (id: string) => {
  return myRequest.delete<IDataType>({
    url: `/comment/${id}`,
  })
}
