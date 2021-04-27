import React from 'react';
import './style.scss';
import { Button, Form, Input, InputNumber } from 'antd';
import { ICreateCraftTypeDTO } from 'apps/aircraft-admin/src/app/services';

const CreateCraftTypeForm = ({ handleCreateCraftTypeForm }) => {
  const [form] = Form.useForm();
  const initialFormValues: ICreateCraftTypeDTO = {
    name: '',
    seat_capacity: 0,
    lugage_capacity_kg: 0,
    average_velocity: 0,
  };

  function handleSubmitForm() {
    form
      .validateFields()
      .then((values) => {
        form.resetFields();
        handleCreateCraftTypeForm(values);
      })
      .catch((info) => {
        console.log('validate err', info);
      });
  }

  return (
    <Form
      className="form-antd"
      form={form}
      layout="vertical"
      name="create_aircraft_form"
      initialValues={initialFormValues}
      onFinish={handleSubmitForm}
    >
      <Form.Item
        name="name"
        label="Aircraft Type Name"
        rules={[
          {
            required: true,
            type: 'string',
            message: 'This field is required.',
            max: 120,
            whitespace: false,
          },
        ]}
      >
        <Input />
      </Form.Item>

      <div className="input-number-wrapper">
      <Form.Item
        name="seat_capacity"
        label="Seat Capacity"
        rules={[
          {
            required: true,
            message: 'Wrong format, at least 100',
          },
        ]}
      >
        <InputNumber min={100} max={99999} />
      </Form.Item>

      <Form.Item
        name="lugage_capacity_kg"
        label="Cargo"
        rules={[
          {
            required: true,
            message: 'Wrong format, at least 100',
          },
        ]}
      >
        <InputNumber min={100} max={99999} />
      </Form.Item>

      <Form.Item
        name="average_velocity"
        label="Velocity"
        rules={[
          {
            required: true,
            message: 'Wrong format, at least 100',
          },
        ]}
      >
        <InputNumber min={100} max={99999} />
      </Form.Item>
      </div>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="submit-form-btn">
          Next
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CreateCraftTypeForm;
