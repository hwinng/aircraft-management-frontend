import { TICKET } from './../types/index';

const initialState = {
  tickets: [],
  ticket_detail: null,
  pagination: null,
  loading: true,
  error: null,
};

function ticket(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case TICKET.GET_ALL_TICKET:
      return {
        ...state,
        tickets: payload,
        loading: false,
      }
    case TICKET.TICKET_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      }
    default:
      return state;
  }
}

export default ticket;
