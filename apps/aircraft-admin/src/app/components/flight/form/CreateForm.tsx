import React from 'react';
import { Modal, Form, Input, Select, Row, Col, DatePicker } from 'antd';
import { v4 as uuid } from 'uuid';
import moment from 'moment';

const CreateFlightForm = ({
  discounts,
  aircrafts,
  filteredAirways,
  visible,
  onCreate,
  onCancel,
}) => {
  const [form] = Form.useForm();
  const [customDate, setCustomDate] = React.useState({
    startValue: null,
    endValue: null,
    endOpen: false,
  });
  const [depatureGate, setDepartureGate] = React.useState<
    { id: number; name: string }[]
  >([]);
  const [arrivalGate, setArrivalGate] = React.useState<
    { id: number; name: string }[]
  >([]);

  const [startDate, setStartDate] = React.useState('');
  const [endDate, setEndDate] = React.useState('');

  const onChange = (field, value) => {
    setCustomDate((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const disabledStartDate = (startValue) => {
    if (!startValue || !customDate.endValue) {
      return false;
    }
    return startValue.valueOf() > customDate.endValue.valueOf();
  };

  const disabledEndDate = (endValue) => {
    if (!endValue || !customDate.startValue) {
      return false;
    }
    return endValue.valueOf() <= customDate.startValue.valueOf();
  };

  const onStartChange = (value, _dateString) => {
    onChange('startValue', value);
    setStartDate(_dateString);
  };

  const onEndChange = (value, _dateString) => {
    onChange('endValue', value);
    setEndDate(_dateString);
  };

  const handleStartOpenChange = (open) => {
    if (!open) {
      setCustomDate((prev) => ({
        ...prev,
        endOpen: true,
      }));
    }
  };

  const handleEndOpenChange = (open) => {
    setCustomDate((prev) => ({
      ...prev,
      endOpen: open,
    }));
  };

  function onSelectAirwayChange(airwayID) {
    filteredAirways.filter((ele) => {
      if (ele.id === airwayID) {
        setDepartureGate(ele.departureAirport.gates);
        setArrivalGate(ele.arrivalAirport.gates);
      }
    });
  }

  return (
    <div>
      <Modal
        visible={visible}
        title="Create Flight"
        okText="Save"
        cancelText="Cancel"
        onCancel={onCancel}
        onOk={() => {
          form
            .validateFields()
            .then((values) => {
              form.resetFields();
              onCreate({
                ...values,
                // discount_id: null,
                departure_time: startDate,
                arrival_time: endDate,
              });
            })
            .catch((info) => {
              console.log('Validate Failed:', info);
            });
        }}
      >
        <Form
          form={form}
          layout="vertical"
          name="create_aircraft_form"
          initialValues={{
            discount_id: null,
          }}
        >
          <Row gutter={4}>
            <Col span={12}>
              <Form.Item
                name="aircraft_id"
                label="Aircraft"
                rules={[
                  {
                    required: true,
                    message: 'Select one',
                  },
                ]}
              >
                <Select placeholder="Select aircraft">
                  {aircrafts.map((ele) => (
                    <Select.Option key={ele.id} value={ele.id}>
                      {ele.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="status"
                label="Status"
                rules={[{ required: true, message: 'Select one' }]}
              >
                <Select>
                  <Select.Option value="OK">OK</Select.Option>
                  <Select.Option value="NOT OK">NOT OK</Select.Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={4}>
            <Col span={12}>
              <Form.Item
                name="airway_id"
                label="Airway"
                rules={[
                  {
                    required: true,
                    message: 'Select one',
                  },
                ]}
              >
                <Select
                  placeholder="Select airway"
                  onChange={onSelectAirwayChange}
                >
                  {filteredAirways.map((ele) => (
                    <Select.Option key={uuid()} value={ele.id}>
                      {ele.departureAirport.city} - {ele.arrivalAirport.city}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="discount_id" label="Discount">
                <Select placeholder="Select available discount">
                  {discounts.map((ele) => (
                    <Select.Option key={uuid()} value={ele.id}>
                      {ele.discountRate} %
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={4}>
            <Col span={12}>
              <Form.Item
                name="departure_time"
                label="Departure Time"
                rules={[
                  {
                    required: true,
                    message: 'Departure time is compulsory',
                  },
                ]}
              >
                <DatePicker
                  disabledDate={disabledStartDate}
                  showTime={{ defaultValue: moment('00:00:00', 'HH:mm:ss') }}
                  format="YYYY-MM-DD HH:mm:ss"
                  value={customDate.startValue}
                  placeholder="Departure Time"
                  onChange={onStartChange}
                  onOpenChange={handleStartOpenChange}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="departure_gate_id"
                label="Depature Gate"
                rules={[
                  {
                    required: true,
                    message: 'Select one',
                  },
                ]}
              >
                <Select placeholder="Select gate">
                  {depatureGate.map((ele) => (
                    <Select.Option key={ele.id} value={ele.id}>
                      {ele.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={4}>
            <Col span={12}>
              <Form.Item
                name="arrival_time"
                label="Arrival Time"
                rules={[
                  {
                    required: true,
                    message: 'Arrival time is compulsory',
                  },
                ]}
              >
                <DatePicker
                  disabledDate={disabledEndDate}
                  showTime={{ defaultValue: moment('00:00:00', 'HH:mm:ss') }}
                  format="YYYY-MM-DD HH:mm:ss"
                  value={customDate.endValue}
                  placeholder="Arrival Time"
                  onChange={onEndChange}
                  open={customDate.endOpen}
                  onOpenChange={handleEndOpenChange}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="arrival_gate_id"
                label="Arrival Gate"
                rules={[
                  {
                    required: true,
                    message: 'Select one',
                  },
                ]}
              >
                <Select placeholder="Select gate">
                  {arrivalGate.map((ele) => (
                    <Select.Option key={ele.id} value={ele.id}>
                      {ele.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </div>
  );
};

export default CreateFlightForm;
