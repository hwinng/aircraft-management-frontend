import { Table, Tag, Button } from 'antd';
import { v4 as uuidv4 } from 'uuid';
import { Link } from 'react-router-dom';
import React from 'react';
import NoData from '../../table-no-data';

const AirportTable = ({
  airports,
  pagination,
  loading,
  onTableChange,
}) => {
  return (
    <React.Fragment>
      <Table
        key={uuidv4()}
        columns={[
          { title: 'ID', dataIndex: 'id' },
          { title: 'Airport', dataIndex: 'name' },
          {
            title: 'City',
            dataIndex: 'city',
          },
          {
            title: 'Country',
            dataIndex: 'country',
          },
          {
            title: 'Capacity',
            dataIndex: 'capacity',
          },
          {
            title: 'Gate',
            dataIndex: 'gates',
            render: (_, record) => {
              let gatesName = record.gates.map(ele => ele.name);
              return (
                <span>[{gatesName.toString()}]</span>
              )
            }
          }
        ]}
        locale={{
          emptyText: <NoData text="Empty" />,
        }}
        rowKey={(record) => record.id}
        dataSource={airports}
        style={{ marginTop: '1rem' }}
        loading={loading}
        pagination={pagination}
        onChange={onTableChange}
      />
    </React.Fragment>
  );
};

export default AirportTable
