import { AIRWAY } from './../types/index';

const initialState = {
  airways: [],
  airway_detail: {},
  pagination: null,
  loading: true,
  error: {},
};

export default function airway(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case AIRWAY.GET_ALL_AIRWAY:
      return {
        ...state,
        airways: payload.content,
        pagination: {
          current: payload.pageable.pageNumber + 1,
          pageSize: payload.pageable.pageSize,
          totalPages: payload.totalPages,
          total: payload.totalElements,
        },
        loading: false,
      };
    case AIRWAY.AIRWAY_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
}

