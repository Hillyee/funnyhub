import { momentPublicRequest } from '@/service/main/moment'
import { defineStore } from 'pinia'
import { setLabelRequset } from '@/service/main/label'
export const useMomentStore = defineStore('moment', {
  state: () => {
    return {}
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
    async setLabel(momentId: number, labels: string[]) {
      await setLabelRequset(momentId, labels)
    },
  },
})
