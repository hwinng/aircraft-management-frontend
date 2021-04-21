import React from 'react';
import { connect, useDispatch } from 'react-redux';
import { Breadcrumb, Spin } from 'antd';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router';
import FlightHistory from '../../../../components/aircraft/detail/flight-history';
import Info from '../../../../components/aircraft/detail/info';
import { StoreState } from 'apps/aircraft-admin/src/app/store';
import { getDetailAirCraft } from 'apps/aircraft-admin/src/app/store/actions/aircraft';

type Props = ReturnType<typeof mapStateToProps>;

const AircarftDetail: React.FC<Props> = ({ aircraft }) => {
  const { air_craft_detail, loading } = aircraft;
  const location = useLocation();
  const paramID = Number(
    location.pathname.slice('/home/aircraft/detail/'.length)
  );
  const dispatch = useDispatch();

  React.useEffect(() => {
    getDetailAirCraft(paramID).then(
      (res) => dispatch(res),
      (err) => dispatch(err)
    );
  }, []);
  return loading ? (
    <Spin tip="Loading..."></Spin>
  ) : (
    <React.Fragment>
      <div style={{ flex: 0.1 }}>
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link to="/home/aircraft">Aircraft</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>Detail</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <div>
        <Info detailInfo={air_craft_detail} />
        <FlightHistory />
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = ({ aircraft }: StoreState) => {
  return {
    aircraft,
  };
};
export default connect(mapStateToProps)(AircarftDetail);
