import React from 'react'
import{ useLocation } from 'react-router';
import { Table, Button,  Tag } from 'antd'
import { v4 as uuidv4 } from "uuid";
import { Link } from 'react-router-dom'
import NoData from '../../table-no-data';
import Search from '../../search-bar';
import CreateAircraft from '../form/create';

const AirCraftList = ({ craft }) => {
  const location = useLocation();
  const [ visible, setVisible ] = React.useState(false);

  const handleSearch = (values) => {
    //TODO: handle search here
    console.log(values)
  }

  const onCreate = (values: any) => {
    //TODO: handle api create here
    console.log(values)
    setVisible(false);
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button type='primary' onClick={() => setVisible(true)}>
          Create
        </Button>
        <CreateAircraft
          aircraftDTO={craft.air_craft_detail}
          visible={visible}
          onCreate={onCreate}
          onCancel={() => {
            setVisible(false);
          }}
        />
        <Search handleSearch={handleSearch} />
      </div>
      <Table
        key={uuidv4()}
        columns={[
          { title: 'ID', dataIndex: 'id'},
          { title: 'Name', dataIndex: 'name'},
          { title: 'Air Carft Type ID', dataIndex: 'aircraft_type_id', render: (_, record) => (<div>{record.aircraftType.id}</div>)},
          { title: 'Status', dataIndex: 'status' , render: (_, tags) => {
            let color  = tags.status === 'ACTIVATED' ? 'green' : 'volcano';
            return (
              <span>
                <Tag color={color} key={tags.id}>
                  {tags.status}
                </Tag>
              </span>
            )
          }},
          { title: '', render: (_, record) => (
            <div>
              <Button
                style={{ display: 'flex', flexDirection: 'column' }}
                type='primary'
              >
                <Link to={`${location.pathname}/detail/${record.id}`}>View</Link>
              </Button>
            </div>
          )},

          { title: '', render: (_, record) => (
            <div>
              <Button
                style={{ display: 'flex', flexDirection: 'column', background: "orange", borderColor: "yellow" }}
                type='primary'
              >
                <Link to={`${location.pathname}/detail/${record.id}`}>Edit</Link>
              </Button>
            </div>
          )},

          { title: '', render: (_, record) => (
            <div>
              <Button
                style={{ display: 'flex', flexDirection: 'column'}}
                type='primary'
                danger
              >
                <Link to={`${location.pathname}/detail/${record.id}`}>Delete</Link>
              </Button>
            </div>
          )},
        ]}
        locale={{
          emptyText: <NoData text='Empty' />
        }}
        rowKey={(record) => record.key}
        dataSource={craft.aircrafts}
        style={{ marginTop: "1rem" }}
      />
    </div>
  )
}

export default AirCraftList
