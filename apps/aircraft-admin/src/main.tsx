import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './app/store';
import 'antd/dist/antd.css'
import Routes from './app/router'
import { ConfigProvider } from 'antd'
import moment from 'moment'
import 'moment/locale/es-us'

moment.locale('es-us')

ReactDOM.render(
    <Provider store={store}>
      <ConfigProvider>
        <Routes />
      </ConfigProvider>
    </Provider>,
  document.getElementById('root')
);
