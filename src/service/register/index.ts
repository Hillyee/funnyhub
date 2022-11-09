import myRequest from "..";
import { IRegister, IRegisterResult } from "./type";

export const userRegisterRequest = (data: IRegister) => {
  return myRequest.post<IRegisterResult>({
    url: '/users',
    data
  })
}