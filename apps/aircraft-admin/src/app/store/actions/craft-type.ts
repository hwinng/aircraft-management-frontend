import { adminGetAllCraftTypes } from "../../services/craft-type"
import { CRAFT_TYPE } from "../types"

export const getAllCraftTypes = () => async dispatch => {
  return adminGetAllCraftTypes().then(
    (res: any) => {
      if (res.status === 200) {
        dispatch({
          type: CRAFT_TYPE.GET_ALL_CRAFT_TYPE,
          payload: res.data
        })
      }
    },
    (err: any) => {
      dispatch({
        type: CRAFT_TYPE.CRAFT_TYPE_ERROR,
        payload: err.message
      })
    }
  )
}
