import { momentPublicRequest } from "@/service/main/moment";
import { defineStore } from "pinia";

export const useMomentStore = defineStore('moment', {
  state: () => {
    return {

    }
  },
  actions: {
    async momentPublicAction(title: string, content: any) {
      console.log(title, content);
      const result = await momentPublicRequest(title, content)
      console.log(result);
    }
  }
})