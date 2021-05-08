import React from 'react';
import { connect, useDispatch } from 'react-redux';
import queryString from 'query-string';
import { Button, Spin, Modal, message } from 'antd';
import {
  createAircraft,
  deleteAircraftById,
  getAllAirCrafts,
  updateAircraftById,
} from '../../../../store/actions/aircraft';
import { getAllCraftTypes } from 'apps/aircraft-admin/src/app/store/actions/craft-type';
import { StoreState } from 'apps/aircraft-admin/src/app/store';
import AirCraftList from '../../../../components/aircraft/list';
import CreateAirCraftForm from '../../../../components/aircraft/form/create';
import Search from 'apps/aircraft-admin/src/app/components/search-bar';
import EditAircraftForm from '../../../../components/aircraft/form/edit';
import { ExclamationCircleOutlined } from '@ant-design/icons';

type Props = ReturnType<typeof mapStateToProps>;
const AirCraft: React.FC<Props> = function ({ aircraft, craftTypes }) {
  const [visible, setVisible] = React.useState(false);
  const [openEditForm, setOpenEditForm] = React.useState(false);
  const [params, setParams] = React.useState({
    page: 0,
    size: 10,
    name: '',
    sort: ['id', 'asc'],
  });
  const [editData, setEditData] = React.useState(null);

  const dispatch = useDispatch();

  function handleSearch(values) {
    setParams({
      ...params,
      name: values,
    });
  }

  function onCreateClick() {
    getAllCraftTypes().then(
      (res) => dispatch(res),
      (err) => dispatch(err)
    );
    setVisible(true);
  }

  function onEditClicked(record, index) {
    getAllCraftTypes().then(
      (res) => dispatch(res),
      (err) => dispatch(err)
    );
    setOpenEditForm(true);
    setEditData(record);
  }

  function handleCreate(values: any) {
    createAircraft(values).then(
      (res) => {
        dispatch(res);
        setTimeout(function(){
          message.loading('Generating...', 2000)
          message.success('Success!')
        }, 4000);
      },
      (err) => {
        dispatch(err);
        message.error('Fail to create! Try again...');
      }
    );
    setParams({
      ...params,
    });
    setVisible(false);
  }

  function handleEdit(values, index) {
    updateAircraftById(index, values)
      .then(
        (res) => {
          dispatch(res);
          message.success('Successfully edited!');
        },
        (err) => {
          dispatch(err);
          message.error('Fail to edit! Try again...');
        }
      )
      .finally(() => {
        setParams({ ...params });
        setEditData(null);
        setOpenEditForm(false);
      });
  }

  function handleDeleteRow(record, index) {
    Modal.confirm({
      title: 'Are you sure delete?',
      icon: <ExclamationCircleOutlined />,
      content: `Aircraft name: ${record.name}`,
      okText: 'Confirm',
      okType: 'danger',
      cancelText: 'Back',
      onOk() {
        deleteAircraftById(index)
          .then(
            (res) => {
              if (res) {
                dispatch(res);
              }
            },
            (err) => dispatch(err)
          )
          .finally(() => {
            setParams({
              ...params,
            });
          });
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }

  function handleTableChange(pagination: any) {
    setParams({
      ...params,
      page: pagination.current - 1,
      size: pagination.pageSize,
    });
  }

  React.useEffect(() => {
    getAllAirCrafts(queryString.stringify(params)).then(
      (res) => dispatch(res),
      (err) => dispatch(err)
    );
  }, [getAllAirCrafts, params]);

  return aircraft.loading ? (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <Spin tip="loading..."></Spin>
    </div>
  ) : (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button type="primary" onClick={onCreateClick}>
          Create
        </Button>

        <CreateAirCraftForm
          types={craftTypes.types}
          visible={visible}
          onCreate={handleCreate}
          onCancel={() => {
            setVisible(false);
          }}
        />
        {editData !== null && (
          <EditAircraftForm
            types={craftTypes.types}
            data={editData}
            openEditForm={openEditForm}
            onOk={handleEdit}
            onCancel={() => {
              setOpenEditForm(false);
              setEditData(null);
            }}
          />
        )}

        <Search
          allowClear={true}
          placeholder="Search by name"
          handleSearch={handleSearch}
        />
      </div>
      <AirCraftList
        onTableChange={handleTableChange}
        pagination={aircraft.pagination}
        craft={aircraft}
        loading={aircraft.loading}
        onDeleteRow={(record, index) => {
          handleDeleteRow(record, index);
        }}
        onEditRow={(record, index) => {
          onEditClicked(record, index);
        }}
      />
    </div>
  );
};

const mapStateToProps = ({ aircraft, craftTypes }: StoreState) => {
  return { aircraft, craftTypes };
};

export default connect(mapStateToProps)(AirCraft);
