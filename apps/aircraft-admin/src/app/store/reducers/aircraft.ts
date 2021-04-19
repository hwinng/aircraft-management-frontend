import { AIR_CRAFT } from './../types/index';

const initialState = {
  aircrafts: [],
  air_craft_detail: null,
  pagination: null,
  loading: true,
  error: null,
};

function aircraft(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case AIR_CRAFT.GET_ALL_AIR_CRAFT:
      return {
        ...state,
        aircrafts: payload.content,
        pagination: {
          current: payload.pageable.pageNumber + 1,
          pageSize: payload.pageable.pageSize,
          totalPages: payload.totalPages,
          total: payload.totalElements,
        },
        loading: false,
      };
    case AIR_CRAFT.GET_AIR_CRAFT_DETAIL:
      return {
        ...state,
        air_craft_detail: payload,
        loading: false
      };
    case AIR_CRAFT.CREATE_AIR_CRAFT:
      console.log('create payload', payload);
      return {
        ...state,
        aircrafts: [...state.aircrafts, payload],
        loading: false,
      };
    default:
      return state;
  }
}

export default aircraft;
