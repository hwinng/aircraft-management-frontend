import http from '../utils/http'
import api from '../api'
export interface IUpdateAccountDTO {
  name: string,
  username: string,
  imageUrl: string,
  email: string,
  role: string
}
export interface IUpdateProfileDTO {
  id: number,
  user_id: number,
  id_card_number: string,
  credit_card_number: string,
  phoneNumber: string
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

export function updateAccount(id: number, data: IUpdateAccountDTO): Promise<unknown> {
  return http.put(api.updateAccount + `/${id}`, data);
}

export function updateProfile(userId: number, data: IUpdateProfileDTO): Promise<unknown> {
  return http.put(api.updateProfile + `/${userId}`, data);
}
