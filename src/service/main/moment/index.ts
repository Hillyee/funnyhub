import myRequest from "../.."
import { momentListResult } from "../moment/type"
import { IDataType } from "@/service/type"

export const momentListRequest = (limit: number, offset: number) => {
  return myRequest.get<momentListResult>({
    url: `/moment`,
    params: {
      limit,
      offset,
    },
  })
}

export const momentPublicRequest = (title: string, content: any) => {
  return myRequest.post<IDataType>({
    url: '/moment',
    data: {
      title,
      content
    }
  })
}

export const getMomentByIdRequest = (id: string) => {
  return myRequest.get<IDataType>({
    url: `/moment/${id}`
  })
}
