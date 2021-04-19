import { getAirCraftList, adminCreateAircraft, adminGetDetailAircraft } from '../../services/aircraft';
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

export const createAircraft = (body: any) => async dispatch => {
  return adminCreateAircraft(body).then(
    (res: any) => {
      dispatch({
        type: AIR_CRAFT.CREATE_AIR_CRAFT,
        payload: res.data
      });
    },
    (err: any) => {
      dispatch({
        type: AIR_CRAFT.AIR_CRAFT_ERROR,
        payload: err
      })
    }
  )
}

export const getDetailAirCraft = (id: number) => async dispatch => {
  return adminGetDetailAircraft(id).then(
    (res: any) => {
      dispatch({
        type: AIR_CRAFT.GET_AIR_CRAFT_DETAIL,
        payload: res.data
      });
    },
    (err: any) => {
      dispatch({
        type: AIR_CRAFT.AIR_CRAFT_ERROR,
        payload: err
      })
    }
  )
}
