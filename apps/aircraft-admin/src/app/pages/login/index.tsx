import React, { useState, useEffect } from 'react';
import './style.scss';
import qs from 'query-string';
import config from '../../config';
import { Button, Input, Form, message } from 'antd';
import { RouteComponentProps } from 'react-router-dom';
import { DispatchProp, connect, useSelector } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { HOME } from '../../router/constants';
import { LOCAL_STORAGE } from '../../constants/';
import { login } from '../../store/actions/auth';
import { Redirect } from 'react-router-dom';
import HanuLogo from '../../../assets/images/hanu-logo.png';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { StoreState } from '../../store';

type ThunkDispatchProps = ThunkDispatch<{}, {}, AnyAction>;
type LoginProps = {
  dispatch: ThunkDispatchProps;
} & DispatchProp &
  RouteComponentProps;

const Login: React.FC<LoginProps> = function ({ dispatch, history, location }) {
  const auth = useSelector((state: StoreState) => state.auth);
  const [form] = Form.useForm();
  const [redirectUrl] = useState(() => {
    const url = qs.parse(location.search).redirectUrl as string;
    return url || HOME.ACCOUNT.path;
  });

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      dispatch(
        login({
          usernameOrEmail: values.usernameOrEmail.trim(),
          password: values.password.trim(),
        })
      );
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    function validateLocalStatus() {
      if (window.localStorage.getItem(LOCAL_STORAGE.TOKEN)) {
        return <Redirect to={redirectUrl} />;
      }
    }
    validateLocalStatus();
  }, [history, location.search, dispatch, redirectUrl]);

  useEffect(() => {
    if (config.isDevelopment) {
      form.setFieldsValue({
        usernameOrEmail: '',
        password: '',
      });
    }
  }, []);

  return (
    <section className="login-page">
      <div className="wrap">
        <div>
          <div className="logo-wrap">
            <img src={HanuLogo} className="logo" alt="" />
            <em>{config.title}</em>
          </div>

          <Form form={form}>
            <Form.Item
              name="usernameOrEmail"
              initialValue={''}
              rules={[
                {
                  required: true,
                  message: 'Please your enter username',
                },
              ]}
            >
              <Input
                placeholder="Username"
                prefix={<UserOutlined />}
                maxLength={32}
                autoComplete="off"
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: 'Please enter your password',
                },
              ]}
            >
              <Input
                placeholder="Password"
                prefix={<LockOutlined />}
                maxLength={32}
                type="password"
                autoComplete="off"
                onPressEnter={handleSubmit}
              />
            </Form.Item>
          </Form>

          <Button
            type="primary"
            style={{ marginTop: '20px' }}
            size="large"
            block
            onClick={handleSubmit}
          >
            Login
          </Button>
          {!auth.userGuard.isAdmin && (
            <>{message.error('Login information is incorrect.')}</>
          )}
        </div>
      </div>
    </section>
  );
};
export default connect()(Login);
