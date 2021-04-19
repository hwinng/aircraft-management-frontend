import React from 'react';
import { connect, DispatchProp } from 'react-redux';
import { Breadcrumb, Row, Spin } from 'antd';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router';
import FlightHistory from '../../../../components/aircraft/detail/flight-history';
import Info from '../../../../components/aircraft/detail/info';
import { StoreState } from 'apps/aircraft-admin/src/app/store';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { getDetailAirCraft } from 'apps/aircraft-admin/src/app/store/actions/aircraft';

type DispatchProps = {
  dispatch: ThunkDispatch<{}, {}, AnyAction>;
} & DispatchProp;

type Props = ReturnType<typeof mapStateToProps> & DispatchProps;

const AircarftDetail: React.FC<Props> = ({ aircraft, dispatch }) => {
  const { air_craft_detail, loading } = aircraft;
  const location = useLocation();
  const paramID = Number(
    location.pathname.slice('/home/aircraft/detail/'.length)
  );

  React.useEffect(() => {
    dispatch(getDetailAirCraft(paramID));
  }, []);
  return loading ? (
    <Spin tip="Loading..."></Spin>
  ) : (
    <React.Fragment>
      <div style={{ flex: 0.1 }}>
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link to="">Aircraft</Link>
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
