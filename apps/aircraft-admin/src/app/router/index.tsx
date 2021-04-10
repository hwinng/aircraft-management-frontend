import React, { useEffect } from 'react'
import PrivateRoute from '../components/private-route'
import CONFIG from '../config'
import routesMap from './routes'
import { BrowserRouter as Router, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import { loginByToken } from '../store/actions/auth'
import { AnyAction } from 'redux'

const Routes: React.FC<AnyAction> = function ({ dispatch }) {

  useEffect(() => {
    dispatch(loginByToken());
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
