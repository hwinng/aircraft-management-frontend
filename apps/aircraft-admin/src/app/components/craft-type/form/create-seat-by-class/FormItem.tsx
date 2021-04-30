import React from 'react';
import { Form, Select, Button, Input } from 'antd';

interface ISeatByClassForm {
  formType: { id: number; name: string };
  formItems;
  onSubmitForm: (
    values
  ) => {
    travelClass_id: number;
    aircraftType_id: number;
    quantity: number;
    rows_quantity: number;
  };
  onPrev: () => void;
}
const FormItem: React.FC<ISeatByClassForm> = ({
  formType,
  formItems,
  onSubmitForm,
  onPrev,
}) => {
  console.log(formType);
  const [form] = Form.useForm();

  function handleSubmitForm() {
    form
      .validateFields()
      .then((values) => {
        form.resetFields();
        onSubmitForm(values);
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
      name={formType.name}
      initialValues={
        formItems
          ? {
              travelClass_id: formItems.travelClass_id,
              rows_quantity: formItems.rows_quantity,
              quantity: formItems.quantity,
            }
          : {
              travelClass_id: formType.id,
            }
      }
      onFinish={handleSubmitForm}
    >
      <Form.Item
        name="travelClass_id"
        label="Status"
        rules={[
          {
            required: true,
            message: 'Please select status',
          },
        ]}
      >
        <Select placeholder="Travel class" disabled>
          <Select.Option value={formType.id}>{formType.name}</Select.Option>
        </Select>
      </Form.Item>

      <div style={{
        display: 'flex',
        justifyContent: 'flex-start',
        gap: '10px'
      }}>
        <Form.Item
          name="quantity"
          label="Total Quantity"
          rules={[
            {
              required: true,
              message: 'Wrong format, at least 100',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="rows_quantity"
          label="Quantity Per Rows"
          rules={[
            {
              required: true,
              message: 'Wrong format, at least 100',
            },
          ]}
        >
          <Input />
        </Form.Item>
      </div>

      <div style={{
        display: 'flex',
        justifyContent: 'flex-end',
        gap:'10px',
      }}>
        <Form.Item>
          <Button danger onClick={onPrev}>Back</Button>
        </Form.Item>

        <Form.Item>
          <Button type='primary' htmlType="submit">Next</Button>
        </Form.Item>
      </div>
    </Form>
  );
};

export default FormItem;
