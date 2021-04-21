import http from '../utils/http'
import api from '../api'

export function adminGetAllFlight(params: string) {
  return http.get(api.adminGetAllFlight + `?${params}`)
}
