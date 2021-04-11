import http from '../utils/http'
import api from '../api'

export function createAccount(data: object) {
  return http.post(api.createAccount, data)
}
