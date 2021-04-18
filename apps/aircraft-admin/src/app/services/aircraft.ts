import http from "../utils/http"
import api from '../api'

export function getAirCraftList(params: string): Promise<unknown> {
  return http.get(api.getAllCrafts + `?${params}`);
}
