import http from '../utils/http';
import api from '../api';

export interface IUpdateFlight {
  departure_time: string;
  departure_gate_id: number;
  arrival_time: string;
  arrival_gate_id: number;
}

export function adminGetAllFlight(params: string) {
  return http.get(api.adminGetAllFlight + `?${params}`);
}

export function adminUpdateFlight(id: number, body: IUpdateFlight) {
  return http.put(`${api.adminUpdateFlight}/${id}`, body);
}

export function adminCreateFlight(body: any) {
  return http.post(api.adminCreateFlight, body);
}

export function adminDeleteFlight(id: number) {
  return http.delete(`${api.adminDeleteFlight}/${id}`);
}
