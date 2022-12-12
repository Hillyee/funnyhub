import { defineStore } from 'pinia'
import { IDataType } from '@/service/type'

export interface errorResultType {
  status?: boolean
  message: string
}

export const useGlobalStore = defineStore('global', {
  state: () => {
    return {
      isLoading: false,
      error: {
        status: false,
      } as errorResultType,
    }
  },
  actions: {
    setLoading() {
      this.isLoading = !this.isLoading
    },
    setError(e: errorResultType) {
      this.error = { ...e }
    },
  },
})
