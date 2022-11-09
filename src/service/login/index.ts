import myRequest from "../index"
import { IAccount, ILoginResult } from "./type"

export const userLoginRequest = (data: IAccount) => {
  return myRequest.post<ILoginResult>({
    url: "/login",
    data
  })
}
