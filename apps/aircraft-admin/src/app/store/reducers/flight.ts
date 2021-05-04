import { FLIGHT } from './../types/index';

const initialState = {
  flights: [],
  flight_detail: null,
  pagination: null,
  loading: true,
  error: null,
};

function flight(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case FLIGHT.GET_ALL_FLIGHT:
      return {
        ...state,
        flights: payload.content,
        pagination: {
          current: payload.pageable.pageNumber + 1,
          pageSize: payload.pageable.pageSize,
          totalPages: payload.totalPages,
          total: payload.totalElements,
        },
        loading: false,
      }
    case FLIGHT.CREATE_FLIGHT:
      console.log('payload', payload)
      return {
        ...state,
      }
    case FLIGHT.FLIGHT_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      }
    default:
      return state;
  }
}

export default flight;
