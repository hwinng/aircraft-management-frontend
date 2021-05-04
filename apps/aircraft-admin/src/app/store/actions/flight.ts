import { adminCreateFlight, adminGetAllFlight } from '../../services';
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
