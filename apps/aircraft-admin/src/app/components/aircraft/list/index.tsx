import React from 'react'
import { useLocation } from 'react-router';
import { connect, DispatchProp } from 'react-redux';
import { Table, Button,  Tag, Spin } from 'antd';
import { v4 as uuidv4 } from "uuid";
import { Link, RouteComponentProps } from 'react-router-dom'
import NoData from '../../table-no-data';
import Search from '../../search-bar';
import CreateAircraft from '../form/create';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { getAllCraftTypes } from '../../../store/actions/craft-type';
import { StoreState } from '../../../store';
import { createAircraft, getAllAirCrafts } from '../../../store/actions/aircraft';

type DispatchProps = {
  dispatch: ThunkDispatch<{}, {}, AnyAction>
} & DispatchProp & RouteComponentProps;
type Props = ReturnType<typeof mapStateToProps> & DispatchProps;

const AirCraftList: React.FC<Props> = ({ craft, craftTypes, dispatch }) => {
  const location = useLocation();
  const [ visible, setVisible ] = React.useState(false);
  const { types, loading } = craftTypes;


  const handleSearch = (values) => {
    //TODO: handle search here
    console.log(values)
  }

  const onCreate = (values: any) => {
    //TODO: handle api create here
    dispatch(createAircraft(values));
    dispatch(getAllAirCrafts('page=0&size=10'));
    setVisible(false);
  }

  React.useEffect(() => {
    dispatch(getAllCraftTypes());
  }, [])

  return loading ? (<Spin tip="Loading..."></Spin>) : (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button type='primary' onClick={() => setVisible(true)}>
          Create
        </Button>
        <CreateAircraft
          types={types}
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

const mapStateToProps = ({ craftTypes }: StoreState ) => {
  return { craftTypes }
}
export default connect(mapStateToProps)(AirCraftList)
