import { getAirCraftList } from '../../services/aircraft';
import { AIR_CRAFT } from '../types';

export const getAllAirCrafts = (params: string) => async dispatch => {
  return getAirCraftList(params).then(
    (res: any) => {
      if (res.status === 200) {
        dispatch({
          type: AIR_CRAFT.GET_ALL_AIR_CRAFT,
          payload: res.data
        })
      }
    },
    (err: any) => {
      dispatch({
        type: AIR_CRAFT.AIR_CRAFT_ERROR,
        payload: err
      })
    }

  )
}
