import { defineStore } from 'pinia'
import {
  addCommentReq,
  getCommentsReq,
  getReplyReq,
  addReplyReq,
  addReplyType,
} from '@/service/main/comment'
export const useCommentStore = defineStore('comment', {
  state: () => {
    return {}
  },
  actions: {
    async getCommentsAction(
      momentId: string | string[],
      limit: number = 9,
      offset: number = 0
    ) {
      const res = await getCommentsReq(momentId, limit, offset)
      if (res.code == 200) {
        return res.data
      }
    },
    async getReplyAction(
      momentId: string | string[],
      commentId: string,
      limit: number = 9,
      offset: number = 0
    ) {
      const res = await getReplyReq(momentId, commentId, limit, offset)
      if (res.code == 200) {
        return res.data
      }
    },
    async addCommentAction(momentId: string, content: string) {
      const res = await addCommentReq(momentId, content)
      if (res.code == 200) {
        return res.data
      }
    },
    async addReplyAction(query: addReplyType) {
      const res = await addReplyReq(query)
      if (res.code == 200) {
        return res.data
      }
    },
  },
})
