import { AIRPORT } from './../types/index';

const initialState = {
  airports: [],
  airport_detail: {},
  pagination: null,
  loading: true,
  error: {},
};

export default function airport(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case AIRPORT.GET_ALL_AIRPORT:
      return {
        ...state,
        airports: payload.content,
        pagination: {
          current: payload.pageable.pageNumber + 1,
          pageSize: payload.pageable.pageSize,
          totalPages: payload.totalPages,
          total: payload.totalElements,
        },
        loading: false,
      };
    case AIRPORT.AIRPORT_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
}

