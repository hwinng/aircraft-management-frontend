import React from 'react';
import { connect, DispatchProp } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import queryString from 'query-string';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { Button, Spin } from 'antd';
import {
  createAircraft,
  getAllAirCrafts,
} from '../../../../store/actions/aircraft';
import { getAllCraftTypes } from 'apps/aircraft-admin/src/app/store/actions/craft-type';
import { StoreState } from 'apps/aircraft-admin/src/app/store';
import AirCraftList from '../../../../components/aircraft/list';
import CreateAirCraftForm from '../../../../components/aircraft/form/create';
import Search from 'apps/aircraft-admin/src/app/components/search-bar';

type ThunkDispatchProps = ThunkDispatch<{}, {}, AnyAction>;
type DispatchProps = {
  dispatch: ThunkDispatchProps;
} & DispatchProp &
  RouteComponentProps;

type Props = ReturnType<typeof mapStateToProps> &
  DispatchProps &
  RouteComponentProps;

const AirCraft: React.FC<Props> = function ({
  dispatch,
  aircraft,
  craftTypes,
}) {
  const [visible, setVisible] = React.useState(false);
  const [params, setParams] = React.useState({
    page: 0,
    size: 5,
    name: '',
    sort: ['id', 'asc'],
  });

  function handleSearch(values) {
    setParams({
      ...params,
      name: values
    });
  }

  function onCreate(values: any) {
    dispatch(createAircraft(values));
    dispatch(getAllAirCrafts(queryString.stringify(params)));
    setVisible(false);
  }

  function handleDeleteRow(id: number) {
    console.log('delete clicked')
  }

  function handleTableChange(pagination: any) {
    setParams({
      ...params,
      page: pagination.current - 1,
      size: pagination.pageSize,
    });
  }

  React.useEffect(() => {
    async function initilizeData() {
      await dispatch(getAllAirCrafts(queryString.stringify(params)));
      await dispatch(getAllCraftTypes());
    }
    initilizeData();
  }, [getAllAirCrafts, params]);

  return aircraft.loading || craftTypes.loading ? (
    <div style={{display: 'flex', justifyContent: 'center' }}>
      <Spin tip="loading..."></Spin>
    </div>
  ) : (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button type="primary" onClick={() => setVisible(true)}>
          Create
        </Button>
        <CreateAirCraftForm
          types={craftTypes.types}
          visible={visible}
          onCreate={onCreate}
          onCancel={() => {
            setVisible(false);
          }}
        />
        <Search
          allowClear={true}
          placeholder='Search by name'
          handleSearch={handleSearch}
        />
      </div>
      <AirCraftList
        onTableChange={handleTableChange}
        pagination={aircraft.pagination}
        craft={aircraft}
        loading={aircraft.loading}
        onDeleteRow={handleDeleteRow}
      />
    </div>
  );
};

const mapStateToProps = ({ aircraft, craftTypes }: StoreState) => {
  return { aircraft, craftTypes };
};

export default connect(mapStateToProps)(AirCraft);
