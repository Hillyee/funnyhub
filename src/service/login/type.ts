export interface IAccount {
  email: string
  password: string
  name?: string
}
export interface ILoginResult {
  code: number
  data: Data
}
export interface Data {
  id: number
  name: string
  token: string
  userInfo: UserInfo
}
export interface UserInfo {
  avatar_url: string
}
export interface IRegisterResult {
  code: number
  message: string
}
