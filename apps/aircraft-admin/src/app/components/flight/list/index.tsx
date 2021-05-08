import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Link } from 'react-router-dom';
import { Button, Table, Tag } from 'antd';
import NoData from '../../table-no-data';
import Moment from 'react-moment';

const FlightTable = ({
  flights,
  pagination,
  loading,
  onTableChange,
  onEditRow,
  onDeleteRow,
}) => {
  return (
    <React.Fragment>
      <h2 style={{ marginTop: '1rem' }}>Flight History</h2>
      <Table
        key={uuidv4()}
        columns={[
          { title: 'ID', dataIndex: 'id' },
          {
            title: 'Airway',
            dataIndex: 'airway',
            render: (_, record) => (
              <div>{`${record.airway.departureAirport.city} - ${record.airway.arrivalAirport.city}`}</div>
            ),
          },
          {
            title: 'Aircraft ID',
            dataIndex: 'aircraft',
            render: (_, record) => <div>{record.aircraft.name}</div>,
          },
          {
            title: 'Departure Time',
            dataIndex: 'departureTime',
            render: (_, record) => (
              <div>
                {record.departureTime.slice(0, -1).split('T').join(' ')}
              </div>
            ),
          },
          {
            title: 'Arrival Time',
            dataIndex: 'arrivalTime',
            render: (_, record) => (
              <div>{record.arrivalTime.slice(0, -1).split('T').join(' ')}</div>
            ),
          },
          {
            title: 'Discount',
            render: (_, record) => {
              let hasDiscount = record.discount.length > 0 ? true : false;
              let color = hasDiscount ? 'green' : 'volcano';
              return (
                <>
                  <Tag color={color}>
                    {hasDiscount ? (
                      <span>{record.discount[0].discountRate} %</span>
                    ) : (
                      '0 %'
                    )}
                  </Tag>
                </>
              );
            },
          },
          {
            title: 'Status',
            render: (_, record) => {
              let isOke = record.status === 'OK' ? 'OK' : 'NOT OK';
              let color = isOke === 'OK' ? 'green' : 'volcano';
              return (
                <>
                  <Tag color={color}>{isOke}</Tag>
                </>
              );
            },
          },
          {
            title: '',
            render: (_, record) => (
              <div>
                <Button
                  style={{ display: 'flex', flexDirection: 'column' }}
                  type="primary"
                  onClick={() => {
                    onEditRow(record, record.id);
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
                    onDeleteRow(record, record.id);
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
  );
};

export default FlightTable;
