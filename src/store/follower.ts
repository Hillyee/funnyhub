import { defineStore } from 'pinia'
import {
  followerCountReq,
  fansCountReq,
  followerListReq,
  fansListReq,
  cancelFollowReq,
  checkIsFollowed,
  addFollowReq,
} from '@/service/main/follower'

export const useFollowerStore = defineStore('follower', {
  state: () => {
    return {}
  },
  actions: {
    async getFollowerCountAction(userId: string | string[]) {
      const res = await followerCountReq(userId)
      if (res.code == 200) {
        return res.data
      }
    },
    async getFansCountAction(followerId: string | string[]) {
      const res = await fansCountReq(followerId)
      if (res.code == 200) {
        return res.data
      }
    },

    async getFollowerListAction(userId: string | string[]) {
      const res = await followerListReq(userId)
      if (res.code == 200) {
        return res.data
      }
    },
    async getFansListAction(followerId: string | string[]) {
      const res = await fansListReq(followerId)
      if (res.code == 200) {
        return res.data
      }
    },
    async cancelFollowAction(followerId: string | string[]) {
      const res = await cancelFollowReq(followerId)
      if (res.code == 200) {
        return res
      }
    },
    async checkFollowAction(followerId: string | string[]) {
      const res = await checkIsFollowed(followerId)
      if (res.code == 200) {
        return res.data
      }
    },
    async addFollowAction(followerId: string | string[]) {
      const res = await addFollowReq(followerId)
      if (res.code == 200) {
        return res.data
      }
    },
  },
})
