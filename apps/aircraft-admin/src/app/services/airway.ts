import http from '../utils/http'
import api from '../api'

export function adminGetAllAirway(params: string) {
  return http.get(`${api.adminGetAllAirways}?${params}`);
}
