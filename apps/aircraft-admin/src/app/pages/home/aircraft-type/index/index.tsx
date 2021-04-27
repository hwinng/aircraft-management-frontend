import { Breadcrumb, Button, Spin } from 'antd';
import { StoreState } from 'apps/aircraft-admin/src/app/store';
import { Link } from 'react-router-dom';
import { getAllCraftTypes } from 'apps/aircraft-admin/src/app/store/actions/craft-type';
import React from 'react';
import { connect, useDispatch } from 'react-redux';
import CraftTypeTable from '../../../../components/craft-type/list';
import Search from 'apps/aircraft-admin/src/app/components/search-bar';

type Props = ReturnType<typeof mapStateToProps>;

const CraftTypeList: React.FC<Props> = ({ craftTypes }) => {
  const dispatch = useDispatch();
  const [params, setParams] = React.useState({
    page: 0,
    size: 10,
    sort: ['id', 'asc'],
  });
  React.useEffect(() => {
    getAllCraftTypes().then(
      (res: any) => dispatch(res),
      (err: any) => dispatch(err)
    );
  }, []);

  function handleTableChange(pagination: any) {
    setParams({
      ...params,
      page: pagination.current - 1,
      size: pagination.pageSize,
    });
  }

  function handleSearch(values) {
    console.log(values);
  }

  return craftTypes.loading ? (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <Spin tip="loading..."></Spin>
    </div>
  ) : (

    <div>
      <div style={{ flex: 0 }}>
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link to="/home/aircraft-type">Aircraft Type</Link>
          </Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem'}}>
        <Button type="primary">
          <Link to="/home/aircraft-type/create">Create</Link>
        </Button>
        <Search
          allowClear={true}
          placeholder="Search by name"
          handleSearch={handleSearch}
        />
      </div>
      <CraftTypeTable
        craftType={craftTypes.types}
        pagination={craftTypes.pagination}
        loading={craftTypes.loading}
        onTableChange={handleTableChange}
      />
    </div>
  );
};

const mapStateToProps = ({ craftTypes }: StoreState) => ({ craftTypes });
export default connect(mapStateToProps)(CraftTypeList);