import React from 'react'
import { v4 as uuidv4 } from 'uuid';
import { Link } from 'react-router-dom';
import { Button, Table } from 'antd'
import NoData from '../../table-no-data';
import Moment from 'react-moment';

const FlightTable = ({
  flights,
  pagination,
  loading,
  onTableChange
}) => {
  return (
    <React.Fragment>
      <h2>Flight History</h2>
      <Table
        key={uuidv4()}
        columns={[
          { title: 'ID', dataIndex: 'id' },
          { title: 'Airway', dataIndex: 'airway', render: (_, record) => (
            <div>{`${record.airway.departureAirport.city} - ${record.airway.arrivalAirport.city}`}</div>
          )},
          {
            title: 'Departure Time',
            dataIndex: 'departureTime',
            render: (_, record) => (
              <Moment format="DD/MM/YYYY hh:mm:ss" >{record.departureTime}</Moment>
            )
          },
          {
            title: 'Arrival Time',
            dataIndex: 'arrivalTime',
            render: (_, record) => (
              <Moment format="DD/MM/YYYY hh:mm:ss" >{record.arrivalTime}</Moment>
            )
          },
          {
            title: '',
            render: (_, record) => (
              <div>
                <Button
                  style={{ display: 'flex', flexDirection: 'column' }}
                  type="primary"
                >
                  <Link to={`${location.pathname}/detail/${record.id}`}>
                    View
                  </Link>
                </Button>
              </div>
            ),
          },
        ]}
        locale={{
          emptyText: <NoData text="Empty" />,
        }}
        rowKey={(record) => record.id}
        dataSource={flights}
        loading={loading}
        pagination={pagination}
        onChange={onTableChange}
      />
    </React.Fragment>
  )
}

export default FlightTable
