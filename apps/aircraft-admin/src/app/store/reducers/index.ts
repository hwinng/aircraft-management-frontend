import auth from './auth'
import account from './account'
import aircraft from './aircraft';

import { combineReducers } from 'redux'

export default combineReducers({
  auth,
  account,
  aircraft
})
