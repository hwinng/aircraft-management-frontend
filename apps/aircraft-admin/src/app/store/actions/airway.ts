import { adminGetAllAirway } from '../../services/airway';
import { AIRWAY } from './../types/index';

export const getAllAirways = (params: string) => {
  return adminGetAllAirway(params).then(
    res => ({
      type: AIRWAY.GET_ALL_AIRWAY,
      payload: res.data
    }),
    err => ({
      type: AIRWAY.AIRWAY_ERROR,
      payload: err
    })
  )
}
