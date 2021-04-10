import { AUTH } from '../types'
import { LOCAL_STORAGE } from '../../constants'

const { LOGIN_SUCCESS, LOGOUT, AUTH_ERROR } = AUTH

export interface UserInfoProps {
  provider: string
  uid: number | undefined
  username: string
  password: string
  loginName: string
  avatarUrl: string
  email: string
  role: string
  token: string | undefined
  bio: string
  location: string
  createdAt: string
}

export interface UserState {
  isLogin: boolean
  isLockScreen: boolean
  userInfo: UserInfoProps
}

const initialState: UserState = {
  isLogin: false,
  isLockScreen: false,
  userInfo: {
    provider: '', // github ?
    uid: undefined, // 用户ID
    createdAt: '', // 注册时间
    bio: '', // 简介
    username: '', // 昵称
    password: '', // 经过MD5加密后的密码
    loginName: '', // 登录名
    avatarUrl: '', // 头像
    email: '',
    role: '',
    token: undefined, // 登录凭证
    location: ''
  }
}

function auth(state = initialState, action: any): UserState {
  switch (action.type) {
    case LOGIN_SUCCESS:
      const userInfo = action.userInfo
      if (userInfo?.token) {
        state.isLogin = true
        window.localStorage.setItem(LOCAL_STORAGE.USER, JSON.stringify(userInfo))
        window.localStorage.setItem(LOCAL_STORAGE.LOGIN_NAME, userInfo.loginName)
      }
      return {
        ...state,
        userInfo: action.userInfo
      }
    default:
      return state
  }
}

export default auth;
