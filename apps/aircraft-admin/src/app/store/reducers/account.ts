import { IUserInfo } from './auth';
import { ACCOUNT } from '../types';
import { LOCAL_STORAGE } from '../../constants';
const { GET_ALL_ACCOUNTS, GET_DETAIL_ACCOUNT, EDIT_ACCOUNT, ACCOUNT_ERROR} = ACCOUNT;

export interface IAccountState {
  accounts: Array<IUserInfo>,
  accountDetail: IUserInfo,
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
  accountDetail: null,
  pagination: {
    pageNumber: 0,
    pageSize: 0,
    totalPages: 0,
    totalElements: 0
  },
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
        isLoadLing: false,
      }
    case GET_DETAIL_ACCOUNT:
      return 'get detail account'
    case EDIT_ACCOUNT:
      return 'edit account'
    case ACCOUNT_ERROR:
      return 'account error'
    default:
      return state;
  }
}

export default account
