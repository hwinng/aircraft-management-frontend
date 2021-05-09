import React from 'react';
import './style.scss';
import { Button, Form, Input, InputNumber } from 'antd';

const CreateCraftTypeForm = ({ formData, handleCreateCraftTypeForm }) => {
  const formItemValues = JSON.parse(formData);
  const [form] = Form.useForm();

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

  const validateMsg = {
    required: 'Required!',
    types: {
      email: 'Invalid format!',
      number: 'Invalid format!',
    },
    number: {
      range: 'Must be between ${min} and ${max}',
    },
  };

  return (
    <Form
      className="form-antd"
      form={form}
      layout="vertical"
      name="create_aircraft_form"
      initialValues={
        formItemValues
          ? {
              name: formItemValues.name ? formItemValues.name : '',
              seat_capacity: formItemValues.seat_capacity
                ? formItemValues.seat_capacity
                : 100,
              lugage_capacity_kg: formItemValues.lugage_capacity_kg
                ? formItemValues.lugage_capacity_kg
                : 100,
              average_velocity: formItemValues.average_velocity
                ? formItemValues.average_velocity
                : 100,
            }
          : {}
      }
      onFinish={handleSubmitForm}
      validateMessages={validateMsg}
    >
      <Form.Item
        name="name"
        label="Aircraft Type Name"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>

      <div className="input-number-wrapper">
        <Form.Item
          name="seat_capacity"
          label="Seat Capacity"
          rules={[{ required: true }, { type: 'number', min: 100, max: 250 }]}
        >
          <InputNumber />
        </Form.Item>

        <Form.Item
          name="lugage_capacity_kg"
          label="Cargo"
          rules={[
            { required: true },
            { type: 'number', min: 2000, max: 10000 },
          ]}
        >
          <InputNumber />
        </Form.Item>

        <Form.Item
          name="average_velocity"
          label="Velocity"
          rules={[
            {
              required: true,
            },
            { type: 'number', min: 500, max: 950 },
          ]}
        >
          <InputNumber />
        </Form.Item>
      </div>

      <Form.Item>
        <Button className="btn-next --step_1" type="primary" htmlType="submit">
          Next
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CreateCraftTypeForm;
