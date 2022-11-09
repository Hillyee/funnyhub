export interface IAccount {
  name: string,
  password: string
}

export interface ILoginResult {
  code: number;
  data: Data;
}
export interface Data {
  id: number;
  name: string;
  token: string;
  userInfo: UserInfo;
}
export interface UserInfo {
  avatar_url: string;
}
