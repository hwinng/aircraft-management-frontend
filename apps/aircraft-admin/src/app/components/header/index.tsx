import React from 'react';
import './styles.scss'
import { Avatar, Dropdown, Menu } from 'antd'
import { withRouter, RouteComponentProps, Link } from 'react-router-dom'
import { HomeMainState } from '../../pages/home/main'
import { connect } from 'react-redux'
import { StoreState } from '../../store'
import { logout } from '../../store/actions/auth'
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  LogoutOutlined
} from '@ant-design/icons';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';

type Props = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps> & HomeMainState & RouteComponentProps

const HomeHeader: React.FC<Props> = function ({
  collapsed,
  setCollapsed,
  auth,
  logout
}) {

  const handleClick = () => {
    logout();
  }
  const menu = (
    <Menu>
        <Menu.Item key="0">
            <a onClick={handleClick} href='#!'>
                <LogoutOutlined />
                <span className='hide-sm'>Logout</span>
            </a>
        </Menu.Item>
    </Menu>
);

  return (
    <div className="header">
      <div className="header__left">
        {collapsed ? (
            <MenuUnfoldOutlined
                onClick={setCollapsed}
                style={{ cursor: 'pointer', fontSize: '20px' }}
            />
            ) : (
            <MenuFoldOutlined
                onClick={setCollapsed}
                style={{ cursor: 'pointer', fontSize: '20px' }}
            />
        )}
      </div>
      {
        auth.isLogin
        &&
        <Dropdown overlay={menu} trigger={['click']}>
            <Link to='/login' className="header__right" onClick={e => e.preventDefault()} style={{paddingTop: '.5rem'}}>
                <Avatar
                    style={{
                        backgroundColor: '#87d068',

                    }}
                    icon={<UserOutlined />}
                />
                <span style={{marginRight: 16, marginLeft: 4, marginTop: '.3rem'}} >{`Hi, ${auth.userInfo.name}`}</span>
            </Link>
        </Dropdown>
      }
    </div>
  )
}

const mapStateToProps = ({ auth }: StoreState) => {
  return { auth };
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => {
  return {
    logout: () => dispatch(logout()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(HomeHeader))
//TODO: xủe lí lại phần private route, auth action
