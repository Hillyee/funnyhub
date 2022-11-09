// 根据process.env.NODE_ENV区分
let BASE_URL = ''
const TIME_OUT = 10000

if (import.meta.env.DEV) {
  // 开发环境下的baseurl
  BASE_URL = '/api'
} else if (import.meta.env.PROD) {
  // 生产环境下的baseurl
  BASE_URL = ''
} else {
  // 测试环境
  BASE_URL = ''
}

export {
  BASE_URL, TIME_OUT
}
