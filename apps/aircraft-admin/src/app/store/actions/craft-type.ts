import { adminGetAllCraftTypes } from '../../services/craft-type';
import { CRAFT_TYPE } from '../types';

export const getAllCraftTypes = () => {
  return adminGetAllCraftTypes().then(
    (res: any) => {
      if (res.status === 200) {
        return {
          type: CRAFT_TYPE.GET_ALL_CRAFT_TYPE,
          payload: res.data,
        };
      }
    },
    (err: any) => {
      return {
        type: CRAFT_TYPE.CRAFT_TYPE_ERROR,
        payload: err.message,
      };
    }
  );
};
