import http from '../utils/http'
import api from '../api'

export function adminGetAllAirports(params: string) {
  return http.get(`${api.adminGetAllAirports}?${params}`);
}
