import React from 'react';
import { StoreState } from 'apps/aircraft-admin/src/app/store';
import queryString from 'query-string';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Spin } from 'antd';
import { getAllFlights } from 'apps/aircraft-admin/src/app/store/actions/flight';
import TicketTable from '../../../components/ticket/TicketTable';
import { getAllTickets } from '../../../store/actions/ticket';

const FlightPage = () => {
  const ticket = useSelector((state: StoreState) => state.ticket);
  const dispatch = useDispatch();

  React.useEffect(() => {
    getAllTickets('').then(
      (res) => dispatch(res),
      (err) => dispatch(err)
    );
  }, [getAllFlights]);

  function handleTableChange(pagination: any) {
    // setParams({
    //   ...params,
    //   page: pagination.current - 1,
    //   size: pagination.pageSize,
    // });
    console.log(pagination);
  }

  return ticket.loading ? (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <Spin tip="loading..."></Spin>
    </div>
  ) : (
    <TicketTable
      tickets={ticket.tickets}
      loading={ticket.loading}
      onTableChange={handleTableChange}
    />
  );
};

export default FlightPage;
