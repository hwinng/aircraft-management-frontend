import { AUTH } from '../types';
import { LOCAL_STORAGE } from '../../constants';
import { pick } from 'lodash';

const { LOGIN_SUCCESS, LOGOUT, AUTH_ERROR, GET_AUTH } = AUTH;
export interface UserInfoProps {
  createdAt: string,
  updatedAt: string,
  id: string,
  name: string,
  username: string,
  email: string,
  imageUrl: string,
  provider:string,
  providerId: any,
  status: string,
  role: Array<IRole>
}

export interface IRole {
  id: number,
  name: string
}
export interface UserState {
  isLogin: boolean,
  isLoading: boolean,
  error: any,
  token: string,
  userInfo: UserInfoProps
}

const initialState: UserState = {
  isLogin: false,
  isLoading: true,
  error: null,
  token: localStorage.getItem(LOCAL_STORAGE.TOKEN),
  userInfo: {
    createdAt: '',
    updatedAt: '',
    id: '',
    name: '',
    username: '',
    email: '',
    imageUrl: '',
    provider:'',
    providerId: null,
    status: '',
    role: []
  }
}

function auth(state = initialState, action: any): UserState {
  switch (action.type) {
    case GET_AUTH:
      return {
        ...state,
        isLogin: true,
        isLoading: false,
        userInfo: action.UserInfo
      }
    case LOGIN_SUCCESS:
      const { accessToken, user } = action.userInfo;
      const { password, ..._ } = user;
      if (accessToken) {
        state.isLogin = true
        window.localStorage.setItem(LOCAL_STORAGE.TOKEN, accessToken);
        window.localStorage.setItem(LOCAL_STORAGE.USER, JSON.stringify(_));
      }
      return {
        ...state,
        userInfo: user,
        token: accessToken,
        isLogin: true,
        isLoading: false
      }
    case LOGOUT:
    case AUTH_ERROR:
      window.localStorage.removeItem(LOCAL_STORAGE.USER);
      window.localStorage.removeItem(LOCAL_STORAGE.USER);
      return {
        ...state,
        isLogin: false,
        isLoading: false,
        userInfo: null,
      }
    default:
      return state;
  }
}

export default auth;
