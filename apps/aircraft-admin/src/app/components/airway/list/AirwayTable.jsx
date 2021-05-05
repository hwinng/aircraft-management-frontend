import React from 'react';
import NoData from '../../table-no-data';
import { Table, Tag } from 'antd';
import { v4 as uuidv4 } from 'uuid';

const AirportTable = ({ airways, pagination, loading, onTableChange }) => {
  return (
    <React.Fragment>
      <Table
        key={uuidv4()}
        columns={[
          { title: 'ID', dataIndex: 'id' },
          {
            title: 'Depature Airport',
            dataIndex: 'depatureAirport',
            render: (_, record) => (
              <span>
                {record.departureAirport.name}, {record.departureAirport.country}
              </span>
            ),
          },
          {
            title: 'Arrival Airport',
            dataIndex: 'arrivalAirport',
            render: (_, record) => (
              <span>
                {record.arrivalAirport.name}, {record.arrivalAirport.country}
              </span>
            ),
          },
          {
            title: 'Distance',
            dataIndex: 'distanceKm',
            render: (value) => (
              <span>{value} Kms</span>
            )
          },
          {
            title: 'Price Status',
            dataIndex: 'priceByClasses',
            render: (_, record) => {
              let status = record.priceByClasses.length === 0 ? 'UNSETTED' : 'SETTED'
              let color = status === 'SETTED' ? 'green ' : 'volcano';
              return (
                <span>
                  <Tag color={color} key={record.id}>
                    {status}
                  </Tag>
                </span>
              );
            },
          },
        ]}
        locale={{
          emptyText: <NoData text="Empty" />,
        }}
        rowKey={(record) => record.id}
        dataSource={airways}
        style={{ marginTop: '1rem' }}
        loading={loading}
        pagination={pagination}
        onChange={onTableChange}
      />
    </React.Fragment>
  );
};

export default AirportTable;
