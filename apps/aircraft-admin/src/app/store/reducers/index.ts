import auth from './auth'
import account from './account'
import { combineReducers } from 'redux'

export default combineReducers({
  auth,
  account
})
