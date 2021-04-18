import { ACCOUNT } from './../types/index';
import { getProfile, getAllAccount, updateAccount, updateProfile } from "../../services"
import { IUpdateAccountDTO, IUpdateProfileDTO} from '../../services/account'

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

export const updateAccountProfile = (id: number, accountDTO: IUpdateAccountDTO, profileDTO: IUpdateProfileDTO) => async dispatch => {
  return Promise.all([
    updateAccount(id, accountDTO).then(
      (res: any) => res,
      (err: any) => {
        console.log('update account err', err)
      }
    ),
    updateProfile(id, profileDTO).then(
      (res: any) => {
        if (res.status === 200) {
          dispatch({
            type: ACCOUNT.UPDATE_PROFILE_ACCOUNT,
            payload: res.data
          });
        };
      },
      (err: any) => {
        console.log('update profile err', err)
      }
    )
  ])
  .then(values => {console.log('values', values)})
  .catch(err => console.log('catch',err))
  .finally(() => console.log('DONE'))
}
