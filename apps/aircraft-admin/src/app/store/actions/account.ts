import { ACCOUNT } from './../types/index';
import {
  getProfile,
  getAllAccount,
  adminUpdateAccount,
  adminUpdateProfile,
} from '../../services';
import { IUpdateAccountDTO, IUpdateProfileDTO } from '../../services/account';

export const getAllAccounts = (params: string) => {
  return getAllAccount(params).then(
    (res: any) => {
      if (res.status === 200) {
        return {
          type: ACCOUNT.GET_ALL_ACCOUNTS,
          payload: res.data,
        };
      }
    },
    (err: any) => {
      return {
        type: ACCOUNT.ACCOUNT_ERROR,
        payload: err,
      };
    }
  );
};

export const getAccountById = (id: number) => {
  return getProfile(id).then(
    (res: any) => {
      if (res.status === 200) {
        return {
          type: ACCOUNT.GET_ACCOUNT_PROFILE,
          payload: res.data,
        };
      }
    },
    (err: any) => {
      return {
        type: ACCOUNT.ACCOUNT_ERROR,
        payload: err,
      };
    }
  );
};

export const updateAccount = (id: number, accountDTO: IUpdateAccountDTO) => {
  return adminUpdateAccount(id, accountDTO).then(
    (res: any) => {
      return {
        type: ACCOUNT.UDATE_ACCOUNT,
        payload: res.data,
      };
    },
    (err: any) => {
      return {
        type: ACCOUNT.ACCOUNT_ERROR,
        payload: err,
      };
    }
  );
};

export const updateProfile = (id: number, profileDTO: IUpdateProfileDTO) => {
  return adminUpdateProfile(id, profileDTO).then(
    (res: any) => {
      return {
        type: ACCOUNT.UPDATE_PROFILE_ACCOUNT,
        payload: res.data,
      };
    },
    (err: any) => {
      return {
        type: ACCOUNT.ACCOUNT_ERROR,
        payload: err,
      };
    }
  );
};
