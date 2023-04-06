import {
  momentPublicRequest,
  updateMomentRequest,
  getMomentListRequest,
  searchMomentListReq,
  userMomentRequset,
} from '@/service/main/moment'
import { defineStore } from 'pinia'
import { setLabelRequset } from '@/service/main/label'
import { queryObject, Author, MomentType } from '@/service/main/moment'
export const useMomentStore = defineStore('moment', {
  state: () => {
    return {
      momentList: [] as MomentType[],
    }
  },
  actions: {
    async momentPublicAction(
      title: string,
      content: any,
      description: string,
      momentUrl: string
    ) {
      const result = await momentPublicRequest(
        title,
        content,
        description,
        momentUrl
      )
      if (result.code == 200) {
        return result
      }
    },
    async momentUpdateAction(
      id: string | string[],
      title: string,
      content: any,
      description: string,
      momentUrl: string
    ) {
      const result = await updateMomentRequest(
        id,
        title,
        content,
        description,
        momentUrl
      )
      if (result.code == 200) {
        return result
      }
    },
    async setLabel(momentId: string, labels: string[]) {
      await setLabelRequset(momentId, labels)
    },
    async momentListAction(limit: number, offset: number) {
      const res = await getMomentListRequest(limit, offset)
      if (res.code == 200) {
        this.momentList.concat(this.momentList, res.data)
        return res.data
      }
    },
    // 搜索动态
    async searchListAction(queryObject: queryObject) {
      const res = await searchMomentListReq(queryObject)
      if (res?.code == 200) {
        return res.data
      }
    },
    async userMomentAction(userId: string | string[]) {
      const res = await userMomentRequset(userId)
      if (res?.code == 200) {
        return res.data
      }
    },
  },
})
