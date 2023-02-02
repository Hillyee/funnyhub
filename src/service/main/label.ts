import myRequest from '@/service/index'
import { IDataType } from '../type'

export interface ILabel {
  code: number
  data?: labelEntity[] | null
}
export interface labelEntity {
  id: number
  name: string
  createAt: string
  updateAt: string
}

export const reqLabelList = (limit: number, offset: number) => {
  return myRequest.get<IDataType<ILabel>>({
    url: `/label?limit=${limit}&offset=${offset}`,
  })
}

export const setLabelRequset = (momentId: number, labels: string[]) => {
  return myRequest.post<IDataType>({
    url: `/moment/${momentId}/labels`,
    data: {
      labels,
    },
  })
}

export type labelType = labelEntity[]
