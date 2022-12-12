import MyRequset from './request'
import { BASE_URL, TIME_OUT } from './request/config'
import LocalCache from '@/utils/cache'
import { useGlobalStore } from '@/store'
import { IDataType } from './type'

const myRequest = new MyRequset({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    requestInterceptor: config => {
      // 请求携带token
      const token = LocalCache.getCache('token')
      if (token) {
        if (config.headers) {
          config.headers.Authorization = `Bearer ${token}`
        }
      }
      const globalStore = useGlobalStore()
      globalStore.setError({ message: '', status: false })
      return config
    },
    requestInterceptorCatch: err => {
      console.log(err)
      return err
    },
    responseInterceptor: res => {
      const result: IDataType = res.data
      if (result.code !== 200) {
        const { message } = result
        const globalStore = useGlobalStore()
        globalStore.setError({ message: message || '', status: true })
      }
      return res
    },
    responseInterceptorCatch: err => {
      return err
    },
  },
})

export default myRequest
