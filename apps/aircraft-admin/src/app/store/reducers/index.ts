import auth from './auth';
import account from './account';
import aircraft from './aircraft';
import craftTypes from './craft-type';
import flight from './flight';
import airway from './airway';
import airport from './airport';
import ticket from './ticket'
import { combineReducers } from 'redux';

export default combineReducers({
  auth,
  account,
  aircraft,
  craftTypes,
  flight,
  airway,
  airport,
  ticket
})
