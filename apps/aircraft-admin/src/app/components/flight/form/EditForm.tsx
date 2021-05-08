import React from 'react';
import { Modal, Form, Input, Select, Row, Col, DatePicker } from 'antd';
import moment from 'moment';
import { dateToMoment } from '../../../utils/date2Moment';

const EditFlight = ({ record, visible, onEdit, onCancel }) => {
  const depatureGates = record.airway.departureAirport.gates;
  const arrivalGates = record.airway.arrivalAirport.gates;
  const [form] = Form.useForm();
  const [customDate, setCustomDate] = React.useState({
    startValue: null,
    endValue: null,
    endOpen: false,
  });
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

  return (
    <div>
      <Modal
        visible={visible}
        title="Edit flight"
        okText="Save"
        cancelText="Cancel"
        onCancel={onCancel}
        onOk={() => {
          form
            .validateFields()
            .then((values) => {
              form.resetFields();
              onEdit(
                {
                  ...values,
                  departure_time: startDate,
                  arrival_time: endDate,
                },
                record.id
              );
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
            aircraft_id: record.aircraft.id,
            status: record.status,
            departure_time: moment(
              dateToMoment(record.departureTime),
              'YYYY-MM-DD HH:mm:ss'
            ),
            arrival_time: moment(
              dateToMoment(record.arrivalTime),
              'YYYY-MM-DD HH:mm:ss'
            ),
            arrival_gate_id: record.arrivalGate.id,
            departure_gate_id: record.departureGate.id,
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
                <Select placeholder="Select aircraft" disabled>
                  <Select.Option
                    key={record.aircraft.id}
                    value={record.aircraft.id}
                  >
                    {record.aircraft.name}
                  </Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="status" label="Status">
                <Select disabled>
                  <Select.Option value="OK">OK</Select.Option>
                  <Select.Option value="NOT OK">NOT OK</Select.Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={4}>
            <Col span={12}></Col>
            <Col span={12}>
              <Form.Item name="discount_id" label="Discount">
                <Input value="0" placeholder="Not available" disabled />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={4}>
            <Col span={12}>
              <Form.Item
                name="departure_time"
                label="Departure Time"
                rules={[
                  { required: true, message: 'Departure time is compulsory' },
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
                <Select placeholder="Select depature gate">
                  {depatureGates.map((gate) => (
                    <Select.Option key={gate.id} value={gate.id}>
                      {gate.name}
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
                  { required: true, message: 'Arrival time is compulsory' },
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
                <Select placeholder="Select arrival gate">
                  {arrivalGates.map((gate) => (
                    <Select.Option key={gate.id} value={gate.id}>
                      {gate.name}
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

export default EditFlight;
