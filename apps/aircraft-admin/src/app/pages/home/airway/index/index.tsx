import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import queryString from 'query-string';
import { StoreState } from 'apps/aircraft-admin/src/app/store';
import { Spin } from 'antd';
import { getAllAirways } from 'apps/aircraft-admin/src/app/store/actions/airway';
import AirwayTable from 'apps/aircraft-admin/src/app/components/airway/list/AirwayTable';
import Search from 'apps/aircraft-admin/src/app/components/search-bar';

const Airway = () => {
  const dispatch = useDispatch();
  const airway = useSelector((state: StoreState) => state.airway);

  const [params, setParams] = React.useState({
    page: 0,
    size: 20,
    departureAircraftName: '',
    sort: ['id', 'asc'],
  });

  React.useEffect(() => {
    getAllAirways(queryString.stringify(params)).then(
      (res) => dispatch(res),
      (err) => dispatch(err)
    );
  }, [getAllAirways, params]);

  function handleTableChange(pagination: any) {
    setParams({
      ...params,
      page: pagination.current - 1,
      size: pagination.pageSize,
    });
  }

  function handleSearch(values) {
    setParams({
      ...params,
      departureAircraftName: values,
    });
  }

  return airway.loading ? (
    <Spin></Spin>
  ) : (
    <div>
      <Search
        allowClear={true}
        placeholder="Search by name"
        handleSearch={handleSearch}
      />
      <AirwayTable
        onTableChange={handleTableChange}
        pagination={airway.pagination}
        airways={airway.airways}
        loading={airway.loading}
      />
    </div>
  );
};

export default Airway;
