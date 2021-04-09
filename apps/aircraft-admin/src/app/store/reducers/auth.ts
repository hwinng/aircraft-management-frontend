import { LOCAL_STORAGE } from './../../constants/storage';
import * as types from '../types';
import { type } from 'node:os';

interface IRole {
  id: number,
  name: string
}

interface IUserState {
  username: string,
  email: string,
  role: IRole,
  access_token: string
}
interface IAuthState {
  user: IUserState,
  token: string,
  isLogin: boolean,
  isLoading: boolean
}
const initialState: IAuthState = {
  user: null,
  token: localStorage.getItem('token'),
  isLogin: false,
  isLoading: true
}

function auth(state = initialState, action: any): IAuthState {
  switch (action.type) {
    case types.LOGIN_SUCCESS:
          localStorage.setItem("token", action.payload);
          return {
            ...state,
            token: action.payload,
            user: action.payload,
            isLogin: true,
            isLoading: false,
          };
        case types.AUTH_ERROR:
        case types.LOGOUT:
          localStorage.removeItem("token");
          return {
            ...state,
            user: null,
            token: null,
            isLogin: false,
            isLoading: false,
          };
        default:
          return state;
  }
}

export default auth
