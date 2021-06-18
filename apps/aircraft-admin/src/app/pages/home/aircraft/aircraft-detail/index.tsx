import React from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { Breadcrumb, Spin } from 'antd';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router';
import { StoreState } from 'apps/aircraft-admin/src/app/store';
import { getDetailAirCraft } from 'apps/aircraft-admin/src/app/store/actions/aircraft';
import { getAllFlights } from 'apps/aircraft-admin/src/app/store/actions/flight';
import queryString from 'query-string';
import FlightTable from '../../../../components/flight/list';
import Info from '../../../../components/aircraft/detail/info';

const AircarftDetail = () => {
  const aircraft = useSelector((state: StoreState) => state.aircraft);
  const flight = useSelector((state: StoreState) => state.flight);
  const dispatch = useDispatch();

  const { air_craft_detail } = aircraft;
  const location = useLocation();
  const paramID = Number(
    location.pathname.slice('/home/aircraft/detail/'.length)
  );
  const [params, setParams] = React.useState({
    page: 0,
    size: 5,
    sort: ['id', 'asc'],
  });

  React.useEffect(() => {
    getDetailAirCraft(paramID).then(
      (res) => dispatch(res),
      (err) => dispatch(err)
    );
    getAllFlights(queryString.stringify(params)).then(
      (res) => dispatch(res),
      (err) => dispatch(err)
    );
  }, [getAllFlights, params]);

  function handleTableChange(pagination: any) {
    setParams({
      ...params,
      page: pagination.current - 1,
      size: pagination.pageSize,
    });
  }

  return (
    <React.Fragment>
      <div style={{ flex: 0.1, marginBottom: '2rem' }}>
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link to="/home/aircraft">Aircraft</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>Detail</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <div>
        {aircraft.loading ? (
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Spin tip="loading..."></Spin>
          </div>
        ) : (
          <Info detailInfo={air_craft_detail} />
        )}
        {!flight.loading && (
          <FlightTable
            onTableChange={handleTableChange}
            pagination={flight.pagination}
            flights={flight.flights}
            loading={flight.loading}
            onEditRow={() => console.log('')}
            onDeleteRow={() => console.log('')}
          />
        )}
      </div>
    </React.Fragment>
  );
};

export default AircarftDetail;
