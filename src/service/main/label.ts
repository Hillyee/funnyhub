import myRequest from '@/service/index'
import { IDataType } from '../type'

export interface ILabel {
  code: number
  data?: labelEntity[] | null
}
export interface labelEntity {
  id: string
  name: string
  createAt: string
  updateAt: string
}

// export const reqLabelList = (limit: number, offset: number) => {
//   return myRequest.get<IDataType<ILabel>>({
//     url: `/label?limit=${limit}&offset=${offset}`,
//   })
// }

export const setLabelRequset = (momentId: string, labels: string[]) => {
  return myRequest.post<IDataType>({
    url: `/label/${momentId}`,
    data: {
      labels,
    },
  })
}

export type labelType = labelEntity[]
