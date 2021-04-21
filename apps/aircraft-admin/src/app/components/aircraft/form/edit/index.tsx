import React from 'react';
import { Modal, Form, Input, Select } from 'antd';

const EditAircraftForm = ({
  types,
  data,
  openEditForm,
  onCancel,
  onOk
}) => {
  const [form] = Form.useForm();
  const initialFormValues = {
    name: data.name,
    aircraft_type_id: data.aircraftType.id,
    status: data.status,
  };

  return (
    <div>
      <Modal
        visible={openEditForm}
        title="Create Aircraft"
        okText="Save"
        cancelText="Cancel"
        onCancel={onCancel}
        onOk={() => {
          form
            .validateFields()
            .then((values) => {
              form.resetFields();
              onOk(values, data.id);
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
          initialValues={initialFormValues}
        >
          <Form.Item
            name="name"
            label="Aircraft name"
            rules={[{ required: true, message: 'Please input aircraft name' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="aircraft_type_id"
            label="Aircraft Type ID"
            rules={[{ required: true, message: 'Please select aircraft type' }]}
          >
            <Select placeholder="Select craft type">
              {types.map((type, index) => (
                <Select.Option key={index} value={type.id}>
                  {type.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="status"
            label="Status"
            rules={[
              {
                required: true,
                message: 'Please select status',
              },
            ]}
          >
            <Select placeholder="Select status">
              <Select.Option value="ACTIVATED">ACTIVATED</Select.Option>
              <Select.Option value="DEACTIVATED">DEACTIVATED</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default EditAircraftForm;
