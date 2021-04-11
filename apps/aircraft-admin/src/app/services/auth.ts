import http from '../utils/http'
import api from '../api'

export function loginService(data: object) {
  return http.post(api.login, data)
}

export function getAuthService() {
  return http.get(api.getMe)
}
