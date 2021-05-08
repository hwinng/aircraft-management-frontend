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
import { IUpdateFlight } from 'apps/aircraft-admin/src/app/services/flight';
import { FLIGHT } from 'apps/aircraft-admin/src/app/store/types/index';
import FlightTable from 'apps/aircraft-admin/src/app/components/flight/list/index';
import Search from 'apps/aircraft-admin/src/app/components/search-bar';
import CreateFlightForm from 'apps/aircraft-admin/src/app/components/flight/form/CreateForm';
import EditFlight from 'apps/aircraft-admin/src/app/components/flight/form/EditForm';
import {
  deleteAircraftById,
  getAllAirCrafts,
} from 'apps/aircraft-admin/src/app/store/actions/aircraft';
import { momentToDate } from 'apps/aircraft-admin/src/app/utils/momentToDate';
import { adminGetAllAirway } from 'apps/aircraft-admin/src/app/services/airway';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { adminGetAllDiscounts } from 'apps/aircraft-admin/src/app/services/discount';

const FlightPage = () => {
  const flight = useSelector((state: StoreState) => state.flight);
  const aircraft = useSelector((state: StoreState) => state.aircraft);
  const airway = useSelector((state: StoreState) => state.airway);
  const dispatch = useDispatch();

  const [filteredAirways, setFilteredAirway] = React.useState([]);
  const [discounts, setDiscounts] = React.useState([]);
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
    //TODO: gell all discount
    adminGetAllDiscounts().then(
      (res) => setDiscounts(res.data),
      (_) => message.error('Some unexpected errors!')
    );
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
            message.error('Selected aircraft is not available now.');
          } else {
            dispatch(res);
            message.success('Successfully created!');
          }
        },
        (err) => {
          dispatch(err);
          message.error('Selected aircraft is not available now.');
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
              console.log(err);
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
  }

  function handleEdit(values, index) {
    const updateFlightDTO: IUpdateFlight = {
      departure_time: momentToDate(values.departure_time),
      arrival_time: momentToDate(values.arrival_time),
      departure_gate_id: values.departure_gate_id,
      arrival_gate_id: values.arrival_gate_id,
    };
    updateFlight(index, updateFlightDTO)
      .then(
        (res) => {
          if (res.type === FLIGHT.FLIGHT_ERROR) {
            dispatch(res);
            message.error('You must update both of the time', 10);
          } else {
            dispatch(res);
            message.success('Successfully edited!');
          }
        },
        (err) => {
          dispatch(err);
          message.error('Conflict time... Try again');
        }
      )
      .catch((_) => {
        message.error('Server is busy now, try later!')
      })
      .finally(() => {
        setParams({
          ...params,
        });
        setEditVisible(false);
      });
  }

  return flight.loading ? (
    <Spin style={{ margin: 'auto' }}></Spin>
  ) : (
    <div>
      {!aircraft.loading && discounts && (
        <>
          <CreateFlightForm
            discounts={discounts}
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
            onCancel={() => {
              setEditVisible(false);
              setEditRecord(null);
            }}
          />
        </>
      )}

      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button type="primary" onClick={handleCreateClick}>
          Create
        </Button>

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
