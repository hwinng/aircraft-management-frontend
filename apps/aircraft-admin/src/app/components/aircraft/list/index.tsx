import React from 'react';
import './style.scss';
import { useLocation } from 'react-router';
import { Table, Button, Tag } from 'antd';
import { v4 as uuidv4 } from 'uuid';
import { Link } from 'react-router-dom';
import NoData from '../../table-no-data';

const AirCraftList = ({
  craft,
  pagination,
  loading,
  onTableChange,
  onDeleteRow,
  onEditRow
}) => {

  const location = useLocation();
  return (
    <React.Fragment>
      <Table
        key={uuidv4()}
        columns={[
          { title: 'ID', dataIndex: 'id' },
          { title: 'Name', dataIndex: 'name' },
          {
            title: 'Air Carft Type Name',
            dataIndex: 'aircraft_type_name',
            render: (_, record) => <div>{record.aircraftType.name}</div>,
          },
          {
            title: 'Status',
            dataIndex: 'status',
            render: (_, tags) => {
              let color = tags.status === 'ACTIVATED' ? 'green' : 'volcano';
              return (
                <span>
                  <Tag color={color} key={tags.id}>
                    {tags.status}
                  </Tag>
                </span>
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
                >
                  <Link to={`${location.pathname}/detail/${record.id}`}>
                    View
                  </Link>
                </Button>
              </div>
            ),
          },

          {
            title: '',
            render: (_, record) => (
              <div>
                <Button
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    background: 'orange',
                    borderColor: 'yellow',
                  }}
                  type="primary"
                  onClick={() => {
                    onEditRow(record, record.id)
                  }}
                  disabled={record.status === 'ACTIVATED'}
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
        dataSource={craft.aircrafts}
        style={{ marginTop: '1rem' }}
        loading={loading}
        pagination={pagination}
        onChange={onTableChange}
      />
    </React.Fragment>
  );
};

export default AirCraftList;
