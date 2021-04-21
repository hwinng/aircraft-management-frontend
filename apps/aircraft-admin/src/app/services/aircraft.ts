import http from "../utils/http"
import api from '../api'
export interface ICreateAirCraftDTO {
  name: string,
  aircraft_type_id: number,
  status: string
}

export interface IUpdateAirCraftDTO {
  name: string,
  aircraft_type_id: number,
  status: string
}

export function getAirCraftList(params: string): Promise<unknown> {
  return http.get(api.getAllCrafts + `?${params}`);
}

export function adminCreateAircraft(body: ICreateAirCraftDTO) {
  return http.post(api.adminCreateAircraft, body);
}

export function adminGetDetailAircraft(id: number) {
  return http.get(api.adminGetDetailAircraft + `/${id}`);
}

export function adminDeleteAircraft(id: number) {
  return http.delete(api.adminDeleteAircraft + `/${id}`);
}

export function adminUpdateAircraft(id: number, body: IUpdateAirCraftDTO) {
  return http.put(api.adminUpdateAircraft + `/${id}`, body);
}
