import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios"
import axios from "axios"

interface MyRequestInterceptor {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestInterceptorCatch?: (error: any) => any
  responseInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig
  responseInterceptorCatch?: (error: any) => any
}

interface MyRequsetConfig extends AxiosRequestConfig {
  interceptors?: MyRequestInterceptor
}

class MyRequset {
  instance: AxiosInstance
  interceptors?: MyRequestInterceptor

  constructor(config: MyRequsetConfig) {
    // 创建实例
    this.instance = axios.create(config)
    // 实例的拦截器
    this.interceptors = config.interceptors

    // 请求拦截器
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    )

    // 响应拦截器
    this.instance.interceptors.request.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    )

    // 所有实例都有的拦截器
    // this.instance.interceptors.request.use((config) => {
    //     return config
    //   }, (error: any) => {
    //     return error
    //   }
    // )

    // this.instance.interceptors.response.use((res) => {
    //     const data = res.data
    //     if (data.returnCode === "-1001") {
    //       console.log("请求失败~, 错误信息")
    //     } else {
    //       return data
    //     }
    //   },(err) => {
    //     // 例子：判断不同的 HtppError显示不同错误信息
    //     if (err.response.status === 404) {
    //       console.log(err.response.data)
    //     }
    //     return err
    //   }
    // )
  }

  // 对每个请求的封装
  request<T = any>(config: MyRequsetConfig): Promise<T> {
    return new Promise((resolve, reject) => {
      // 对某个请求的拦截器
      if (config.interceptors?.requestInterceptor) {
        // 可以对某个请求设置是否显示loading效果
        
        config = config.interceptors.requestInterceptor(config)
      }
      // request请求
      this.instance
        .request(config)
        .then((res) => {
          resolve(res.data)
        })
        .catch((error) => {
          console.log(error.response.data)
        })
    })
  }

  get<T = any>(config: MyRequsetConfig): Promise<T> {
    return this.request<T>({ ...config, method: "GET" })
  }

  post<T = any>(config: MyRequsetConfig): Promise<T> {
    return this.request<T>({ ...config, method: "POST" })
  }

  delete<T = any>(config: MyRequsetConfig): Promise<T> {
    return this.request<T>({ ...config, method: "DELETE" })
  }

  patch<T = any>(config: MyRequsetConfig): Promise<T> {
    return this.request<T>({ ...config, method: "PATCH" })
  }
}

export default MyRequset
