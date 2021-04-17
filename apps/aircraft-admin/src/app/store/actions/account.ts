import { ACCOUNT } from './../types/index';
import { getAllAccount } from "../../services"

export const getAllAccounts = (params: string) => async dispatch => {
  return getAllAccount(params).then(
    (res: any) => {
      dispatch({
        type: ACCOUNT.GET_ALL_ACCOUNTS,
        payload: res.data
      })
    },
    (err: any) => {
      console.log(err);
    }

  )
}
