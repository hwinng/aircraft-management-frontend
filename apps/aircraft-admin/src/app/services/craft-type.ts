import api from "../api"
import http from "../utils/http"

export function adminGetAllCraftTypes(): Promise<unknown> {
  return http.get(api.adminGetAllCraftType);
}
