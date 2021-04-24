import React from 'react';
import { useLocation } from 'react-router';
import { Table, Button, Tag } from 'antd';
import { v4 as uuidv4 } from 'uuid';
import { Link } from 'react-router-dom';
import NoData from '../../table-no-data';

const CraftTypeTable = ({ craftType, pagination, loading, onTableChange }) => {
  const location = useLocation();
  return (
    <React.Fragment>
      <Table
        key={uuidv4()}
        columns={[
          { title: 'ID', dataIndex: 'id' },
          { title: 'Name', dataIndex: 'name' },
          { title: 'Seat Capacity', dataIndex: 'seatCapacity' },
          {
            title: 'Luggage Capacity',
            dataIndex: 'luggageCapacityKg',
            render: (_, record) => (
              <div>{`${record.luggageCapacityKg} kg`}</div>
            ),
          },
          {
            title: 'Average Velocity',
            dataIndex: 'averageVelocity',
            render: (_, record) => (
              <div>{`${record.averageVelocity} km/h`}</div>
            ),
          },
        ]}
        locale={{
          emptyText: <NoData text="Empty" />,
        }}
        rowKey={(record) => record.id}
        dataSource={craftType}
        style={{ marginTop: '1rem' }}
        loading={loading}
        pagination={pagination}
        onChange={onTableChange}
      />
    </React.Fragment>
  );
};

export default CraftTypeTable;
