import { CRAFT_TYPE } from './../types/index';

const initialState = {
  types: [],
  type_detail: null,
  pagination: null,
  loading: true,
  error: null,
  create_step: 0,
};

function craftType(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case CRAFT_TYPE.GET_ALL_CRAFT_TYPE:
      return {
        ...state,
        types: payload.content,
        pagination: {
          current: payload.pageable.pageNumber + 1,
          pageSize: payload.pageable.pageSize,
          totalPages: payload.totalPages,
          total: payload.totalElements,
        },
        loading: false,
      };
    case CRAFT_TYPE.GET_TYPE_DETAIL:
      return {
        ...state,
        loading: false
      };
    case CRAFT_TYPE.CREATE_CRAFT_TYPE:
      return {
        ...state,
        types: [...state.types, payload],
        type_detail: payload,
        create_step: 1,
        loading: false
      }
    case CRAFT_TYPE.CRAFT_TYPE_ERROR:
      return {
        ...state,
        error: payload,
      };
    case CRAFT_TYPE.CREATE_SEAT_BY_CLASS:
      console.log('seat', payload);
      return {
        ...state
      }
    default:
      return state;
  }
}

export default craftType;
