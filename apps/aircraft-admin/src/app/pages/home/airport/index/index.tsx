import React from 'react';
import AirportTable from 'apps/aircraft-admin/src/app/components/airport/list/index';
import { useDispatch, useSelector } from 'react-redux';
import queryString from 'query-string';
import { StoreState } from 'apps/aircraft-admin/src/app/store';
import { Spin } from 'antd';
import { getAllAirports } from 'apps/aircraft-admin/src/app/store/actions/airport';

const AircraftPage = () => {
  const dispatch = useDispatch();
  const airport = useSelector((state: StoreState) => state.airport);

  const [params, setParams] = React.useState({
    page: 0,
    size: 10,
    name: '',
    sort: ['id', 'asc'],
  });

  React.useEffect(() => {
    getAllAirports(queryString.stringify(params)).then(
      (res) => dispatch(res),
      (err) => dispatch(err)
    );
  }, [getAllAirports, params]);

  function handleTableChange(pagination: any) {
    setParams({
      ...params,
      page: pagination.current - 1,
      size: pagination.pageSize,
    });
  }

  return airport.loading ? (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <Spin tip="loading..."></Spin>
    </div>
  ) : (
    <AirportTable
      onTableChange={handleTableChange}
      pagination={airport.pagination}
      airports={airport.airports}
      loading={airport.loading}
    />
  );
};

export default AircraftPage;
