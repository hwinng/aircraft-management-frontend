import { adminGetAllFlight } from '../../services';
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
