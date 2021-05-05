import React from 'react';
import { StoreState } from 'apps/aircraft-admin/src/app/store';
import queryString from 'query-string';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch, useSelector } from 'react-redux';
import { Button, message, Modal, Spin } from 'antd';
import {
  createFlight,
  deleteFlight,
  getAllFlights,
  updateFlight,
} from 'apps/aircraft-admin/src/app/store/actions/flight';
import { FLIGHT } from 'apps/aircraft-admin/src/app/store/types/index';
import FlightTable from 'apps/aircraft-admin/src/app/components/flight/list/index';
import Search from 'apps/aircraft-admin/src/app/components/search-bar';
import CreateFlightForm from 'apps/aircraft-admin/src/app/components/flight/form/CreateForm';
import EditFlight from 'apps/aircraft-admin/src/app/components/flight/form/EditForm';
import { deleteAircraftById, getAllAirCrafts } from 'apps/aircraft-admin/src/app/store/actions/aircraft';
import { momentToDate } from 'apps/aircraft-admin/src/app/utils/momentToDate';
import { adminGetAllAirway } from 'apps/aircraft-admin/src/app/services/airway';
import { ExclamationCircleOutlined } from '@ant-design/icons';

const FlightPage = () => {
  const flight = useSelector((state: StoreState) => state.flight);
  const aircraft = useSelector((state: StoreState) => state.aircraft);
  const airway = useSelector((state: StoreState) => state.airway);
  const dispatch = useDispatch();

  const [filteredAirways, setFilteredAirway] = React.useState([]);
  const [visible, setVisible] = React.useState(false);
  const [editVisible, setEditVisible] = React.useState(false);
  const [editRecord, setEditRecord] = React.useState(null);

  const [params, setParams] = React.useState({
    page: 0,
    size: 10,
    sort: ['id', 'asc'],
  });

  React.useEffect(() => {
    getAllFlights(queryString.stringify(params)).then(
      (res) => dispatch(res),
      (err) => dispatch(err)
    );
  }, [getAllFlights, params]);

  function handleTableChange(pagination: any) {
    setParams({
      ...params,
      page: pagination.current - 1,
      size: pagination.pageSize,
    });
  }

  function handleCreateClick() {
    setVisible(true);
    getAllAirCrafts(queryString.stringify(params)).then(
      (res) => dispatch(res),
      (err) => dispatch(err)
    );
    adminGetAllAirway(
      queryString.stringify({
        page: 0,
        size: 20,
        checkSetPrice: true,
        sort: ['id', 'asc'],
      })
    ).then((res: any) => setFilteredAirway(res.data.content));
  }

  function handleSubmitForm(values) {
    //TODO: format moment to date here
    const createFlightDTO = {
      ...values,
      departure_time: momentToDate(values.departure_time),
      arrival_time: momentToDate(values.arrival_time),
    };
    createFlight(createFlightDTO)
      .then(
        (res) => {
          if (res.type === FLIGHT.FLIGHT_ERROR) {
            dispatch(res);
            message.error('Fail to create! Try again...');
          } else {
            dispatch(res);
            message.success('Successfully created!');
          }
        },
        (err) => {
          dispatch(err);
          message.error('Fail to create! Try again...');
        }
      )
      .finally(() => {
        setParams({
          ...params,
        });
      });
    setVisible(false);
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
        deleteFlight(index)
          .then(
            (res) => {
              if (res) {
                dispatch(res);
              }
            },
            (err) => {
              console.log(err)
            }
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

  function onEdit(record, index) {
    setEditVisible(true);
    setEditRecord(record);
    // getAllCraftTypes().then(
    //   (res) => dispatch(res),
    //   (err) => dispatch(err)
    // );
    // setOpenEditForm(true);
    // setEditData(record);

    console.log(record);
  }

  function handleEdit(values, index) {
    const updateFlightDTO = {
      ...values,
      airway_id: 0,
      departure_time: momentToDate(values.departure_time),
      arrival_time: momentToDate(values.arrival_time),
    };
    updateFlight(index, updateFlightDTO)
      .then(
        (res) => {
          if (res.type === FLIGHT.FLIGHT_ERROR) {
            dispatch(res);
            message.error('Fail to edit! Try again...');
          } else {
            dispatch(res);
            message.success('Successfully edited!');
          }
        },
        (err) => {
          dispatch(err);
          message.error('Fail to create! Try again...');
        }
      )
      .finally(() => {
        setParams({
          ...params,
        });
        setVisible(false);
      });
  }

  function handleSearch(values) {
    // setParams({
    //   ...params,
    //   name: values,
    // });
  }

  return flight.loading ? (
    <Spin tip="Loading"></Spin>
  ) : (
    <div>
      {!aircraft.loading && (
        <>
          <CreateFlightForm
            aircrafts={aircraft.aircrafts}
            filteredAirways={filteredAirways}
            visible={visible}
            onCreate={handleSubmitForm}
            onCancel={() => setVisible(false)}
          />
        </>
      )}

      {editRecord !== null && (
        <>
          <EditFlight
            record={editRecord}
            visible={editVisible}
            onEdit={handleEdit}
            onCancel={() => setEditVisible(false)}
          />
        </>
      )}

      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button type="primary" onClick={handleCreateClick}>
          Create
        </Button>

        <Search
          allowClear={true}
          placeholder="Search by name"
          handleSearch={handleSearch}
        />
      </div>

      <FlightTable
        flights={flight.flights}
        pagination={flight.pagination}
        loading={flight.loading}
        onTableChange={handleTableChange}
        onDeleteRow={(record, index) => {
          handleDeleteRow(record, index);
        }}
        onEditRow={(record, index) => {
          onEdit(record, index);
        }}
      />
    </div>
  );
};

export default FlightPage;
