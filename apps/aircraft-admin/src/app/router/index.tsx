import React, { useEffect } from 'react'
import PrivateRoute from '../components/private-route'
import CONFIG from '../config'
import routesMap from './routes'
import { BrowserRouter as Router, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import { loginByToken } from '../store/actions/auth'
import { AnyAction } from 'redux'
import { LOCAL_STORAGE } from '../constants'

const Routes: React.FC<AnyAction> = function ({ dispatch }) {

  useEffect(() => {
    if (localStorage.getItem(LOCAL_STORAGE.TOKEN)) {
      dispatch(loginByToken());
    }
  }, [])

  return (
    <Router basename={CONFIG.baseURL}>
      <Switch>
        {routesMap.map((route, idx) => (
          <PrivateRoute {...route} key={idx} />
        ))}
      </Switch>
    </Router>
  )
}

export default connect()(Routes)
