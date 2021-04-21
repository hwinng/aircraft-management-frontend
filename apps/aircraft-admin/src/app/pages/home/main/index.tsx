import React, { useState } from 'react';
import './styles.scss';
import Sidebar from '../../../components/sidebar';
import Header from '../../../components/header';
import { Layout } from 'antd';
import { connect } from 'react-redux';
import { StoreState } from '../../../store';
import { LOCAL_STORAGE } from '../../../constants';
import FooterComponent from '../../../components/footer';

const { Content, Footer } = Layout;
const { SIDEBAR_COLLAPSED } = LOCAL_STORAGE;

export interface HomeMainState {
  collapsed?: boolean;
  setCollapsed?: () => void;
}

const storageCollapsed = Number(
  window.localStorage.getItem(SIDEBAR_COLLAPSED) || true
);

const HomeMain: React.FC = function (props) {
  const [collapsed, setCollapsed] = useState(!storageCollapsed);

  function handleToggleCollapsed() {
    setCollapsed(!collapsed);
    window.localStorage.setItem(SIDEBAR_COLLAPSED, Number(collapsed) + '');
  }

  return (
    <section className="home-main">
      <Layout>
        <Sidebar {...{ collapsed }} />
        <Layout className="home-layout">
          <Header {...{ collapsed, setCollapsed: handleToggleCollapsed }} />
          <Content id="container">
            {React.Children.map(props.children, (child) => child)}
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            <FooterComponent />
          </Footer>
        </Layout>
      </Layout>
    </section>
  );
};

const mapStateToProps = ({ auth }: StoreState) => {
  return { auth };
};

export default connect(mapStateToProps)(HomeMain);
