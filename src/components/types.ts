export interface UserProps {
  isLogin: boolean
  name?: string
  id?: number
  avatar_url?: string
}

export interface RuleProp {
  type: 'required' | 'email' | 'password' | 'custom'
  message: string
  validator?: () => boolean
}
export type RulesProp = RuleProp[]
