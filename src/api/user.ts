import http from './http'

export interface UserAccount {
  id?: number
  username: string
  password: string
  name: string
  college: string
  grade: string
  bio: string
}

export function getUsers() {
  return http.get<UserAccount[]>('/users')
}

export function createUser(data: UserAccount) {
  return http.post<UserAccount>('/users', data)
}
