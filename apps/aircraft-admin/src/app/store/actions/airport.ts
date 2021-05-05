import { adminGetAllAirports } from '../../services/airport';
import { AIRPORT } from './../types/index';

export const getAllAirports = (params: string) => {
  return adminGetAllAirports(params).then(
    res => ({
      type: AIRPORT.GET_ALL_AIRPORT,
      payload: res.data
    }),
    err => ({
      type: AIRPORT.AIRPORT_ERROR,
      payload: err
    })
  )
}
