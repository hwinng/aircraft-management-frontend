import http from '../utils/http'
import api from '../api'

export interface IUpdateFlight {
  id: number,
  aircraft_id: number,
  airway_id: number,
  departure_time: string,
  departure_gate_id: number,
  arrival_time: string,
  arrival_gate_id: number,
  status: string,
  discount_id: number,
}

export function adminGetAllFlight(params: string) {
  return http.get(api.adminGetAllFlight + `?${params}`)
}

export function adminUpdateFlight(body: IUpdateFlight ) {
  return http.put(api.adminUpdateFlight, body)
}

// export function adminCreateFlight(body:)
