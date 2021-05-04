import auth from './auth';
import account from './account';
import aircraft from './aircraft';
import craftTypes from './craft-type';
import flight from './flight';
import airway from './airway';
import { combineReducers } from 'redux'

export default combineReducers({
  auth,
  account,
  aircraft,
  craftTypes,
  flight,
  airway
})
