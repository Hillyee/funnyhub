//引入
import { Base64 } from 'js-base64'

class BaseCode {
  passwordEncode(password: string) {
    return Base64.encode(password)
  }
  passwordDecode(password: string) {
    return Base64.decode(password)
  }
}

export default new BaseCode()
