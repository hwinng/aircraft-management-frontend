import React from 'react';
import { Modal, Form, Input, Select, Tag, Row, Col, DatePicker } from 'antd';

// "id": 0,
//   "aircraft_id": 0,
//   "airway_id": 0,
//   "departure_time": "2021-05-03T07:40:45.208Z",
//   "departure_gate_id": 0,
//   "arrival_time": "2021-05-03T07:40:45.208Z",
//   "arrival_gate_id": 0,
//   "status": "string",
//   "discount_id": 0
const CreateFlightForm = ({
  aircrafts,
  airways,
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

  const onStartChange = (value) => {
    onChange('startValue', value);
  };

  const onEndChange = (value) => {
    onChange('endValue', value);
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
                discount_id: 0,
                departure_gate_id: 0,
                arrival_gate_id: 0,
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
          initialValues={{}}
        >
          <Row gutter={4}>
            <Col span={12}>
              <Form.Item
                name="aircraft_id"
                label="Select Aircraft"
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
              <Form.Item name="status" label="Status">
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
                label="Select Airway"
                rules={[
                  {
                    required: true,
                    message: 'Select one',
                  },
                ]}
              >
                <Select placeholder="Select aircraft">
                  {airways.map((ele) => (
                    <Select.Option key={ele.id} value={ele.id}>
                      {ele.departureAirport.city} - {ele.arrivalAirport.city}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="discount_id" label="Discount">
                <Input value="0" placeholder="Not available" disabled />
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <Col>
              <Form.Item name="departure_time" label="Departure Time">
                <DatePicker
                  disabledDate={disabledStartDate}
                  showTime
                  format="YYYY-MM-DD HH:mm:ss"
                  value={customDate.startValue}
                  placeholder="Departure Time"
                  onChange={onStartChange}
                  onOpenChange={handleStartOpenChange}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <Col>
              <Form.Item name="arrival_time" label="Arrival Time">
                <DatePicker
                  disabledDate={disabledEndDate}
                  showTime
                  format="YYYY-MM-DD HH:mm:ss"
                  value={customDate.endValue}
                  placeholder="Arrival Time"
                  onChange={onEndChange}
                  open={customDate.endOpen}
                  onOpenChange={handleEndOpenChange}
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </div>
  );
};

export default CreateFlightForm;
