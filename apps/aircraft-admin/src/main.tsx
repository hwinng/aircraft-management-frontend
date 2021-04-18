import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './app/store';
import 'antd/dist/antd.css'
import Routes from './app/router'
import { ConfigProvider } from 'antd'
import zh_CN from 'antd/lib/locale-provider/zh_CN'
import moment from 'moment'
import 'moment/locale/zh-cn'

moment.locale('zh-cn')

ReactDOM.render(
    <Provider store={store}>
      <ConfigProvider locale={zh_CN}>
        <Routes />
      </ConfigProvider>
    </Provider>,
  document.getElementById('root')
);
