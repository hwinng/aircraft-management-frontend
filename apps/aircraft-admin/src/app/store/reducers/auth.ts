import { AUTH } from '../types';
import { LOCAL_STORAGE } from '../../constants';

const { LOGIN_SUCCESS, LOGOUT, AUTH_ERROR, GET_AUTH, USER_GUARD } = AUTH;
export interface IUserInfo {
  createdAt: string;
  updatedAt: string;
  id: string;
  name: string;
  username: string;
  email: string;
  imageUrl: string;
  provider: string;
  providerId: any;
  status: string;
  roles: Array<IRole>;
}

export interface IRole {
  id: number;
  name: string;
}
export interface IUserState {
  isLogin: boolean;
  isLoading: boolean;
  error: any;
  token: string;
  userGuard: any;
  userInfo: IUserInfo;
}

const initialState: IUserState = {
  isLogin: false,
  isLoading: true,
  error: null,
  token: localStorage.getItem(LOCAL_STORAGE.TOKEN),
  userGuard: {
    isAdmin: true,
  },
  userInfo: {
    createdAt: '',
    updatedAt: '',
    id: '',
    name: '',
    username: '',
    email: '',
    imageUrl: '',
    provider: '',
    providerId: null,
    status: '',
    roles: [],
  },
};

function auth(state = initialState, action: any): IUserState {
  switch (action.type) {
    case GET_AUTH:
      return {
        ...state,
        isLogin: true,
        isLoading: false,
        userInfo: action.userInfo,
      };
    case USER_GUARD:
      return {
        ...state,
        userGuard: {
          isAdmin: action.payload.isAdmin,
        },
        isLoading: false,
      };

    case LOGIN_SUCCESS:
      const { accessToken, user } = action.userInfo;
      const { password, ..._ } = user;
      if (accessToken) {
        state.isLogin = true;
        window.localStorage.setItem(LOCAL_STORAGE.TOKEN, accessToken);
        window.localStorage.setItem(LOCAL_STORAGE.USER, JSON.stringify(_));
      }
      return {
        ...state,
        userInfo: user,
        token: accessToken,
        isLogin: true,
        isLoading: false,
      };
    case LOGOUT:
    case AUTH_ERROR:
      window.localStorage.removeItem(LOCAL_STORAGE.USER);
      window.localStorage.removeItem(LOCAL_STORAGE.TOKEN);
      return {
        ...state,
        isLogin: false,
        isLoading: false,
        userInfo: null,
      };
    default:
      return state;
  }
}

export default auth;
