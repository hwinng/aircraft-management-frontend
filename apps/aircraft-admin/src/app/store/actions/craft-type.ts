import { adminCreateCraftType, adminCreateSeatByClass, adminGetAllCraftTypes, ICreateCraftTypeDTO, ICreateSeatDTO } from '../../services/craft-type';
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

export const createCraftType = (body: ICreateCraftTypeDTO) => {
  return adminCreateCraftType(body).then(
    (res: any) => ({
      type: CRAFT_TYPE.CREATE_CRAFT_TYPE,
      payload: res.data
    }),
    (err: any) => ({
      type: CRAFT_TYPE.CRAFT_TYPE_ERROR,
      payload: err
    })
  )
}

export const createSeatByClass = (body: ICreateSeatDTO) => {
  return adminCreateSeatByClass(body).then(
    (res: any) => ({
      type: CRAFT_TYPE.CREATE_SEAT_BY_CLASS,
      payload: res.data
    }),
    (err: any) => ({
      type: CRAFT_TYPE.CRAFT_TYPE_ERROR,
      payload: err
    })
  )
}
