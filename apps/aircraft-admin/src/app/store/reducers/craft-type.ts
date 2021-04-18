import { CRAFT_TYPE } from './../types/index';

const initialState = {
  types: [],
  type_detail: null,
  pagination: null,
  loading: true,
  error: null,
};

function craftType(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case CRAFT_TYPE.GET_ALL_CRAFT_TYPE:
      return {
        ...state,
        types: payload.content,
        loading: false,
      };
    case CRAFT_TYPE.GET_TYPE_DETAIL:
      return {
        ...state,
      };
    case CRAFT_TYPE.CRAFT_TYPE_ERROR:
      return {
        ...state,
        error: payload,
      };
    default:
      return state;
  }
}

export default craftType;
