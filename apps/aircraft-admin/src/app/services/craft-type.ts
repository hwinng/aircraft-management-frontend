import api from "../api"
import http from "../utils/http"

export interface ICreateCraftTypeDTO {
  name: string,
  seat_capacity: number,
  lugage_capacity_kg: number,
  average_velocity: number
}

export interface ICreateSeatDTO {
  travelClass_id: number,
  aircraftType_id: number,
  quantity: number,
  rows_quantity: number
}
export function adminGetAllCraftTypes(params: string): Promise<unknown> {
  return http.get(`${api.adminGetAllCraftType}?${params}`);
}

export function adminCreateCraftType(body: ICreateCraftTypeDTO): Promise<unknown> {
  return http.post(api.adminCreateCraftType, body);
}

export function adminCreateSeatByClass(body: ICreateSeatDTO): Promise<unknown> {
  return http.post(api.adminCreateSeatByClass, body);
}
