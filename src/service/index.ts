import MyRequset from "./request"
import { BASE_URL, TIME_OUT } from "./request/config"
import LocalCache from "@/utils/cache"

const myRequest = new MyRequset({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    requestInterceptor: (config) => {
      // 请求携带token
      const token = LocalCache.getCache("token")
      if (token) {
        if (config.headers) {
          config.headers.Authorization = `Bearer ${token}`
        }
      }
      return config
    },
    requestInterceptorCatch: (err) => {
      console.log(err)
      return err
    },
    responseInterceptor: (res) => {
      return res
    },
    responseInterceptorCatch: (err) => {
      console.log(err)
      return err
    },
  },
})

export default myRequest
