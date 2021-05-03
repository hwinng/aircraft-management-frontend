import React from 'react';
import { StoreState } from 'apps/aircraft-admin/src/app/store';
import queryString from 'query-string';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Spin } from 'antd';
import { getAllFlights } from 'apps/aircraft-admin/src/app/store/actions/flight';
import FlightTable from 'apps/aircraft-admin/src/app/components/flight/list/index';
import Search from 'apps/aircraft-admin/src/app/components/search-bar';
import CreateFlightForm from 'apps/aircraft-admin/src/app/components/flight/form/CreateForm';
import { getAllAirCrafts } from 'apps/aircraft-admin/src/app/store/actions/aircraft';
import { getAllAirways } from 'apps/aircraft-admin/src/app/store/actions/airway';

const FlightPage = () => {
  const flight = useSelector((state: StoreState) => state.flight);
  const aircraft = useSelector((state: StoreState) => state.aircraft);
  const airway = useSelector((state: StoreState) => state.airway);

  const dispatch = useDispatch();

  const [visible, setVisible] = React.useState(false);
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

  function handleSubmitForm(values) {
    console.log('form values', values);
    // getAllCraftTypes().then(
    //   (res) => dispatch(res),
    //   (err) => dispatch(err)
    // );
    setVisible(false);
  }

  function handleDeleteRow(record, index) {
    // Modal.confirm({
    //   title: 'Are you sure delete?',
    //   icon: <ExclamationCircleOutlined />,
    //   content: `Aircraft name: ${record.name}`,
    //   okText: 'Confirm',
    //   okType: 'danger',
    //   cancelText: 'Back',
    //   onOk() {
    //     deleteAircraftById(index)
    //       .then(
    //         (res) => {
    //           if (res) {
    //             dispatch(res);
    //           }
    //         },
    //         (err) => dispatch(err)
    //       )
    //       .finally(() => {
    //         setParams({
    //           ...params,
    //         });
    //       });
    //   },
    //   onCancel() {
    //     console.log('Cancel');
    //   },
    // });
  }

  function handleEditRow(record, index) {
    // getAllCraftTypes().then(
    //   (res) => dispatch(res),
    //   (err) => dispatch(err)
    // );
    // setOpenEditForm(true);
    // setEditData(record);
    console.log(record);
  }

  function handleSearch(values) {
    // setParams({
    //   ...params,
    //   name: values,
    // });
  }

  function handleCreateClick() {

    getAllAirCrafts(queryString.stringify(params)).then(
      res => dispatch(res),
      err => dispatch(err)
    );

    getAllAirways(queryString.stringify(params)).then(
      res => dispatch(res),
      err => dispatch(err)
    )

    setVisible(true);
  }
  return flight.loading ? (
    <Spin tip="Loading"></Spin>
  ) : (
    <div>
      {aircraft.loading === false && airway.loading === false && (
        <CreateFlightForm
          aircrafts={aircraft.aircrafts}
          airways={airway.airways}
          visible={visible}
          onCreate={handleSubmitForm}
          onCancel={() => setVisible(false)}
        />
      )}
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button
          type="primary"
          onClick={handleCreateClick}
        >
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
          handleEditRow(record, index);
        }}
      />
    </div>
  );
};

export default FlightPage;
