import { AUTH } from '../types'
import { loginService, getAuthService } from '../../services'

const { LOGIN_SUCCESS, LOGOUT, AUTH_ERROR, GET_AUTH} = AUTH

export const login = ({ usernameOrEmail, password }) => async dispatch => {
  return loginService({ usernameOrEmail, password }).then(
    (res: any) => {
      if (res.data.accessToken) {
        const userInfo = res.data;
        dispatch({
          type: LOGIN_SUCCESS,
          userInfo,
        });
        dispatch(loginByToken())
      }
    },
    (error: any) => {
      console.log(error)
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
      console.log(err)
      dispatch({
        type: AUTH_ERROR
      })
    }
  )
}

/**
 * 注销登录
 */
export const logout = () => async dispatch => {
  dispatch({
    type: LOGOUT
  })
}
