import { AUTH } from '../types';
import { loginService, getAuthService } from '../../services';
import { ActionCreator, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';

const { LOGIN_SUCCESS, LOGOUT, AUTH_ERROR, GET_AUTH} = AUTH

export const login = ({ usernameOrEmail, password }) => async dispatch => {
  return loginService({ usernameOrEmail, password }).then(
    (res: any) => {
      if (res.data.accessToken) {
        const userInfo = res.data;
        if (userInfo.user.roles.some(ele => ele.name==='ROLE_ADMIN')) {
          dispatch({
            type: LOGIN_SUCCESS,
            userInfo,
          });
        dispatch(loginByToken())
        }
      }
    },
    (error: any) => {
      dispatch({
        type: AUTH_ERROR
      })
    })
}

export const loginByToken = () => async dispatch => {
  return getAuthService().then(
    (res: any) => {
      dispatch({
        type: GET_AUTH,
        userInfo: res.data
      })
    },
    (err: any) => {
      dispatch({
        type: AUTH_ERROR
      })
    }
  )
}


// LOG OUT
// export const logout = () => (dispatch) => {
//   dispatch({ type: LOGOUT });
// };

export const logout: ActionCreator<ThunkAction<
  // The type of the last action to be dispatched - will always be promise<T> for async actions
  Promise<any>,
  // The type for the data within the last action
  any,
  // The type of the parameter for the nested function
  any,
  // The type of the last action to be dispatched
  any
>> = () => {
  return async (dispatch: Dispatch) => {
    const _logout: any = {
      type: LOGOUT,
    };
    dispatch(_logout);
    return dispatch(_logout);
  };
};

// export const postPersonActionCreator: ActionCreator<ThunkAction<
//   // The type of the last action to be dispatched - will always be promise<T> for async actions
//   Promise<IPostedPersonAction>,
//   // The type for the data within the last action
//   IPostPersonResult,
//   // The type of the parameter for the nested function
//   IPostPerson,
//   // The type of the last action to be dispatched
//   IPostedPersonAction
// >> = (person: IPostPerson) => {
//   return async (dispatch: Dispatch) => {
//     const postingPersonAction: IPostingPersonAction = {
//       type: "PostingPerson",
//     };
//     dispatch(postingPersonAction);
//     const result = await postPersonFromApi(
//       person
//     );
//     const postPersonAction: IPostedPersonAction = {
//       type: "PostedPerson",
//       result,
//     };
//     return dispatch(postPersonAction);
//   };
// };


