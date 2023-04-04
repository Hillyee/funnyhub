import { defineStore } from 'pinia'
import { getLikeStatus, addLike, cancelLike } from '@/service/main/like'

export const useLikeStore = defineStore('like', {
  state: () => {
    return {}
  },
  actions: {
    async getLikeStatusAction(momentId: string) {
      const res = await getLikeStatus(momentId)
      if (res.code == 200) {
        return res.data
      }
    },

    async addLikeAction(momentId: string, beUserId: string) {
      const res = await addLike(momentId, beUserId)
      if (res.code == 200) {
        return true
      }
    },

    async cancelLikeAction(momentId: string, beUserId: string) {
      const res = await cancelLike(momentId, beUserId)
      if (res.code == 200) {
        return true
      }
    },
  },
})
