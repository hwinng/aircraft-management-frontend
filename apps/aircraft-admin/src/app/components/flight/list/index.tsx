import React from 'react'
import { v4 as uuidv4 } from 'uuid';
import { Link } from 'react-router-dom';
import { Button, Table, Tag } from 'antd'
import NoData from '../../table-no-data';
import Moment from 'react-moment';

const FlightTable = ({
  flights,
  pagination,
  loading,
  onTableChange,
  onEditRow,
  onDeleteRow
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
            title: 'Status',
            render: (_, record) =>
                {
                  let isOke = record.status === 'OK' ? 'OK' : 'NOT OK';
                  let color = isOke === 'OK' ? 'green' : 'volcano';
                  return (
                    <>
                      <Tag color={color}>
                        {isOke}
                      </Tag>
                    </>
                  )
                }
          },
          {
            title: '',
            render: (_, record) => (
              <div>
                <Button
                  style={{ display: 'flex', flexDirection: 'column' }}
                  type="primary"
                  onClick={() => {
                    onEditRow(record, record.id)
                  }}
                >
                  Edit
                </Button>
              </div>
            ),
          },
          {
            title: '',
            render: (_, record) => (
              <div>
                <Button
                  style={{ display: 'flex', flexDirection: 'column' }}
                  type="primary"
                  danger
                  onClick={() => {
                    onDeleteRow(record, record.id)
                  }}
                >
                  Delete
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
