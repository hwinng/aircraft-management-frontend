import http from '../utils/http'
import api from '../api'

export function adminGetAllDiscounts() {
  return http.get(api.adminGetAllDiscounts)
}
