import { ACCOUNT } from './../types/index';
import { getProfile, getAllAccount } from "../../services"

export const getAllAccounts = (params: string) => async dispatch => {
  return getAllAccount(params).then(
    (res: any) => {
      if (res.status === 200) {
        dispatch({
          type: ACCOUNT.GET_ALL_ACCOUNTS,
          payload: res.data
        })
      }
    },
    (err: any) => {
      dispatch({
        type: ACCOUNT.ACCOUNT_ERROR,
        payload: err
      })
    }

  )
}

export const getAccountById = (id: number) => async dispatch => {
  return getProfile(id).then(
    (res: any) => {
      if ( res.status === 200) {
        dispatch({
          type: ACCOUNT.GET_ACCOUNT_PROFILE,
          payload: res.data
        })
      }
    },
    (err: any) => {
      dispatch({
        type: ACCOUNT.ACCOUNT_ERROR,
        payload: err
      })
    }
  )
}
