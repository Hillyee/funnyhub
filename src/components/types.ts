import { UserType } from '@/service/login/index'

export interface UserProps extends UserType {
  isLogin: boolean
}

export interface RuleProp {
  type: 'required' | 'email' | 'password' | 'custom'
  message: string
  validator?: () => boolean
}
export type RulesProp = RuleProp[]
