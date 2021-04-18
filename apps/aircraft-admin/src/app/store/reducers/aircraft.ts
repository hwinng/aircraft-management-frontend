import { resolve } from 'node:path';
import { AIR_CRAFT } from './../types/index';

const initialState = {
  aircrafts: [],
  air_craft_detail: null,
  pagination: null,
  loading: true,
  error: null
}

function aircraft (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case AIR_CRAFT.GET_ALL_AIR_CRAFT:
      return {
        ...state,
        aircrafts: payload.content,
        loading: false,
      }
    case AIR_CRAFT.GET_AIR_CRAFT_DETAIL:
      return {
        ...state
      }
    default:
      return state;
  }
}

export default aircraft;
