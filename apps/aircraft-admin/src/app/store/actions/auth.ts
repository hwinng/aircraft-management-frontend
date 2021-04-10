import config from '../../config'
import moment from 'moment'
import { isPlainObject } from 'lodash'
import { AUTH } from '../types'
import { LOCAL_STORAGE } from '../../constants'
//import { serviceLoginByToken, serviceLogout } from '@/services'
import { Dispatch } from 'redux'

const { LOGIN_SUCCESS } = AUTH

export function setUser(userInfo: any = {}) {
  if (userInfo.createdAt) {
    userInfo.createdAt = moment(userInfo.createdAt).format('YYYY-MM-DD')
  }
  return {
    type: LOGIN_SUCCESS,
    userInfo: userInfo
  }
}

/**
 * Token 登录
 */
export function loginByToken(token: string) {
  // return function (dispatch: Dispatch) {
  //   return serviceLoginByToken(token).then((res: any) => {
  //     if (res.data.success) {
  //       const userInfo = res.data.data.userInfo
  //       return dispatch(setUser(userInfo))
  //     }
  //     return dispatch(setUser())
  //   })
  // }
}

/**
 * 注销登录
 */
export function logout() {
  // serviceLogout()
  // .finally(() => {
  //   const localStorageWhiteList = [LOCAL_STORAGE.LOGIN_NAME]
  //   const localStorageLen = window.localStorage.length
  //   const allLocalStorageKey: string[] = []

  //   for (let i = 0; i < localStorageLen; i++) {
  //     const key = window.localStorage.key(i) as string
  //     allLocalStorageKey.push(key)
  //   }

  //   allLocalStorageKey.forEach(keyName => {
  //     if (localStorageWhiteList.indexOf(keyName) === -1) {
  //       window.localStorage.removeItem(keyName)
  //     }
  //   })
  //   window.sessionStorage.clear()
  //   window.location.reload(true)
  // })
}

export function validateLocalStatus() {
  let userInfo = {}
  try {
    userInfo = JSON.parse(window.localStorage.getItem(LOCAL_STORAGE.USER) as string)
    if (!isPlainObject(userInfo)) {
      userInfo = {}
    }
  } catch {}
  return setUser(userInfo);
}
