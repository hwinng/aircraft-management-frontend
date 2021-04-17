import http from '../utils/http'
import api from '../api'

enum EnumRole {
  user = 'ROLE_USER',
  admin = 'ROLE_ADMIN'
}
interface updateAccountDTO {
  name: string,
  username: string,
  email: string,
  imageUrl: string,
  role: EnumRole
}

export function createAccount(data: object): Promise<unknown> {
  return http.post(api.createAccount, data);
}

export function getAllAccount(params: string): Promise<unknown> {
  return http.get(api.getAllAccount + `?${params}`);
}

export function getProfile(id: number): Promise<unknown> {
  return http.get(api.getAccountProfile + `/${id}`);
}

export function updateAccountByID(id: number, data: updateAccountDTO): Promise<unknown> {
  return http.put(api.updateAccountByID + `/${id}`);
}
