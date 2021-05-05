import React from 'react'
import { v4 as uuidv4 } from 'uuid';
import { Table } from 'antd'
import NoData from '../../components/table-no-data/index';
import Moment from 'react-moment';

const TicketTable = ({
  tickets,
  loading,
  onTableChange,
}) => {
  return (
    <React.Fragment>
      <h2>Ticket History</h2>
      <Table
        key={uuidv4()}
        columns={[
          { title: 'ID', dataIndex: 'id' },
          { title: 'User', dataIndex: 'user', render: (value) => (
            <span>{value.name}</span>
          )},
          { title: 'User Email', dataIndex: 'user_email', render: (_value, record) => (
            <span>{record.user.email}</span>
          )},
          {
            title: 'Flight',
            dataIndex: 'flight',
            render: (_, record) => (
              <span>{record.flight.airway.departureAirport.name}={record.flight.airway.arrivalAirport.name}</span>
            )
          },
          {
            title: 'Departure Time',
            dataIndex: 'depature_time',
            render: (_, record) => (
              <Moment format="DD/MM/YYYY hh:mm:ss" >{record.flight.departureTime}</Moment>
            )
          },
          {
            title: 'Arrival Time',
            dataIndex: 'arrival_time',
            render: (_, record) => (
              <Moment format="DD/MM/YYYY hh:mm:ss" >{record.flight.arrivalTime}</Moment>
            )
          },
          {
            title: 'Aircraft Name',
            dataIndex: 'aircraft_name',
            render: (_, record) => (
              <span>{record.aircraftSeat.aircraft.name}</span>
            )
          },
          {
            title: 'Seat Location',
            dataIndex: 'seat_location',
            render: (_, record) => (
              <span>{record.aircraftSeat.id}-{record.aircraftSeat.travelClass.description}</span>
            )
          },
        ]}
        locale={{
          emptyText: <NoData text="Empty" />,
        }}
        rowKey={(record) => record.id}
        dataSource={tickets}
        loading={loading}
        onChange={onTableChange}
      />
    </React.Fragment>
  )
}

export default TicketTable
