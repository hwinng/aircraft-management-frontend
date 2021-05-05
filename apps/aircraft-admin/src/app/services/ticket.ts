import http from '../utils/http'
import api from '../api'

export function adminGetAllTicket(params: string) {
  return http.get(api.adminGetAllTickets)
}
