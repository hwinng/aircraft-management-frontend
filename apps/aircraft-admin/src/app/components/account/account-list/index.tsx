import React from 'react';
import{ useLocation } from 'react-router';
import { Table, Button } from 'antd'
import { v4 as uuidv4 } from "uuid";
import NoData from '../../table-no-data';
import { Link } from 'react-router-dom'

const AccountList = ({
  accounts,
}) => {

  const location = useLocation();

  return (
    <Table
      key={uuidv4()}
      columns={[
        { title: 'ID', dataIndex: 'id'},
        { title: 'Username', dataIndex: 'username'},
        { title: 'Name', dataIndex: 'name'},
        { title: 'Email', dataIndex: 'email'},
        { title: '', render: (_, record) => (
          <div>
            <Button
              style={{ display: 'flex', flexDirection: 'column'}}
              type='primary'
            >
              <Link to={`${location.pathname}/detail/${record.id}`}>View</Link>
            </Button>
          </div>
        )},
      ]}
      locale={{
        emptyText: <NoData text='Empty' />
      }}
      rowKey={(record) => record.key}
      dataSource={accounts}
      style={{ marginTop: "1rem" }}
    />
  )
}

export default AccountList
