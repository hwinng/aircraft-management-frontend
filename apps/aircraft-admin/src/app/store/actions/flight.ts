import { IUpdateFlight } from './../../services/flight';
import { adminCreateFlight, adminDeleteFlight, adminGetAllFlight, adminUpdateFlight } from '../../services';
import { FLIGHT } from '../types/index';

export const getAllFlights = (params: string) => {
  return adminGetAllFlight(params).then(
    (res: any) => ({
      type: FLIGHT.GET_ALL_FLIGHT,
      payload: res.data
    }),
    (err: any) => ({
      type: FLIGHT.FLIGHT_ERROR,
      payload: err
    })
  )
}

export const createFlight = (body: any) => {
  return adminCreateFlight(body).then(
    (res: any) => ({
      type: FLIGHT.CREATE_FLIGHT,
      payload: res.data
    }),
    (err: any) => ({
      type: FLIGHT.FLIGHT_ERROR,
      payload: err
    })
  )
}

export const updateFlight = (id: number, body: IUpdateFlight) => {
  return adminUpdateFlight(id, body).then(
    (res: any) => ({
      type: FLIGHT.UPDATE_FLIGHT,
      payload: res.data
    }),
    (err: any) => ({
      type: FLIGHT.FLIGHT_ERROR,
      payload: err
    })
  )
}

export const deleteFlight = (id: number) => {
  return adminDeleteFlight(id).then(
    (res: any) => ({
      type: FLIGHT.DELETE_FLIGHT,
      payload: res.data
    }),
    (err: any) => ({
      type: FLIGHT.FLIGHT_ERROR,
      payload: err
    })
  )
}
