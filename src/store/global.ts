import { defineStore } from 'pinia'

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
      setTimeout(() => {
        this.isLoading = !this.isLoading
      }, 300)
    },
    setError(e: errorResultType) {
      this.error = { ...e }
    },
  },
})
