export interface UserProps {
  isLogin: boolean
  name?: string
  id?: number
}

export interface RuleProp {
  type: 'required' | 'email' | 'password'
  message: string
}
export type RulesProp = RuleProp[]
