import { IUserInfo } from './auth';
import { ACCOUNT } from '../types';
const { GET_ALL_ACCOUNTS, GET_ACCOUNT_PROFILE, UPDATE_PROFILE_ACCOUNT, ACCOUNT_ERROR} = ACCOUNT;

export interface IProfile {
  userInfo: IUserInfo,
  id_card_number: string,
  credit_card_number: string,
  phone_number: string
}
export interface IAccountState {
  accounts: Array<IUserInfo>,
  account_profile: IProfile,
  pagination: IPagination,
  isLoading: boolean,
  error: any
}
export interface IPagination {
  pageNumber: number,
  pageSize: number,
  totalPages: number,
  totalElements: number
}

const initialState: IAccountState = {
  accounts: [],
  account_profile: null,
  pagination: null,
  isLoading: true,
  error: {}
}
function account (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_ALL_ACCOUNTS:
      return {
        ...state,
        accounts: payload.content,
        pagination: {
          pageNumber: payload.pageable.pageNumber,
          pageSize: payload.pageable.pageSize,
          totalPages: payload.totalPages,
          totalElements: payload.totalElements
        },
        isLoading: false,
      }
    case GET_ACCOUNT_PROFILE:
      return {
        ...state,
        account_profile: {
          userInfo: payload.user,
          id_card_number: payload.id_card_number,
          credit_card_number: payload.credit_card_number,
          phone_number: payload.phone_number
        },
        isLoading: false,
      }
    case UPDATE_PROFILE_ACCOUNT:
      return {
        ...state,
        account_profile: {
          userInfo: payload.user,
          id_card_number: payload.id_card_number,
          credit_card_number: payload.credit_card_number,
          phone_number: payload.phone_number
        },
        isLoading: false
      }
    case ACCOUNT_ERROR:
      return {
        ...state,
        isLoading: false,
        err: {msg: 'error'}
      }
    default:
      return state;
  }
}

export default account
