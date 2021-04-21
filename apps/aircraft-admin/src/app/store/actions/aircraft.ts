import { AIR_CRAFT } from './../types/index';
import { ICreateAirCraftDTO, IUpdateAirCraftDTO } from '../../services/aircraft';
import {
  getAirCraftList,
  adminCreateAircraft,
  adminGetDetailAircraft,
  adminDeleteAircraft,
  adminUpdateAircraft,
} from '../../services/aircraft';

export const getAllAirCrafts = (params: string) => {
  return getAirCraftList(params).then(
    (res: any) => {
      if (res.status === 200) {
        return {
          type: AIR_CRAFT.GET_ALL_AIR_CRAFT,
          payload: res.data,
        };
      }
    },
    (err: any) => {
      return {
        type: AIR_CRAFT.AIR_CRAFT_ERROR,
        payload: err,
      };
    }
  );
};

export const createAircraft = (body: ICreateAirCraftDTO) => {
  return adminCreateAircraft(body).then(
    (res: any) => {
      return {
        type: AIR_CRAFT.CREATE_AIR_CRAFT,
        payload: res.data,
      };
    },
    (err: any) => {
      return {
        type: AIR_CRAFT.AIR_CRAFT_ERROR,
        payload: err,
      };
    }
  );
};

export const getDetailAirCraft = (id: number) => {
  return adminGetDetailAircraft(id).then(
    (res: any) => {
      return ({
        type: AIR_CRAFT.GET_AIR_CRAFT_DETAIL,
        payload: res.data,
      });
    },
    (err: any) => {
      return ({
        type: AIR_CRAFT.AIR_CRAFT_ERROR,
        payload: err,
      });
    }
  );
};

export const updateAircraftById = (id: number, body: IUpdateAirCraftDTO) => {
  return adminUpdateAircraft(id, body).then(
    (res: any) => ({
      type: AIR_CRAFT.UPDATE_CRAFT,
      payload: res.data
    }),
    (err: any) => ({
      type: AIR_CRAFT.AIR_CRAFT_ERROR,
      payload: err
    })
  )
}

export const deleteAircraftById = (id: number) => {
  return adminDeleteAircraft(id).then(
    (res: any) => {
      return {
        type: AIR_CRAFT.DELETE_AIR_CRAFT,
        payload: res.data,
      };
    },
    (err: any) => {
      return {
        type: AIR_CRAFT.AIR_CRAFT_ERROR,
        payload: err,
      };
    }
  );
};
