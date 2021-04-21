import auth from './auth';
import account from './account';
import aircraft from './aircraft';
import craftTypes from './craft-type';
import flight from './flight';
import { combineReducers } from 'redux'

export default combineReducers({
  auth,
  account,
  aircraft,
  craftTypes,
  flight
})
