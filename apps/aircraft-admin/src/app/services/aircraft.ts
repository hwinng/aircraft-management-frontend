import http from "../utils/http"
import api from '../api'

export function getAirCraftList(params: string): Promise<unknown> {
  return http.get(api.getAllCrafts + `?${params}`);
}

export function adminCreateAircraft(body: any) {
  return http.post(api.adminCreateAircraft, body);
}

export function adminGetDetailAircraft(id: number) {
  return http.get(api.adminGetDetailAircraft + `/${id}`);
}

