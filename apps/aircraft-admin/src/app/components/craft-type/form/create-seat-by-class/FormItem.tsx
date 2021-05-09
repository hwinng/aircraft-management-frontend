import React from 'react';
import { Form, Select, Button, Input, InputNumber } from 'antd';
import { LOCAL_STORAGE } from 'apps/aircraft-admin/src/app/constants';

interface ISeatByClassForm {
  formType: { id: number; name: string };
  formItems;
  totalSeat: number;
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
  totalSeat,
  onSubmitForm,
  onPrev,
}) => {
  const [totalSeatByClass, setTotalSetByClass] = React.useState(0);
  console.log('total Seat by class', totalSeatByClass);

  //TODO: custom validate seat here
  function validateSeatByClass() {
    let seatOfBusiness = 0;
    if (localStorage.getItem(LOCAL_STORAGE.STEP_2)) {
      seatOfBusiness = JSON.parse(localStorage.getItem(LOCAL_STORAGE.STEP_2))
        .quantity;
    }
    switch (formType.name) {
      case 'BUSINESS':
        return setTotalSetByClass(Math.ceil(totalSeat / 10));
      case 'ECONOMY':
        return setTotalSetByClass(
          Math.ceil(Number(totalSeat - seatOfBusiness) / 2)
        );
      case 'ECONOMY FLEX':
        return setTotalSetByClass(
          Math.ceil(Number(totalSeat - seatOfBusiness) / 2)
        );
      default:
        return setTotalSetByClass(0);
    }
  }
  React.useEffect(() => {
    validateSeatByClass();
  }, []);

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
      validateMessages={validateMsg}
    >
      <Form.Item name="travelClass_id" label="Status">
        <Select placeholder="Travel class" disabled>
          <Select.Option value={formType.id}>{formType.name}</Select.Option>
        </Select>
      </Form.Item>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          gap: '10px',
        }}
      >
        <Form.Item
          name="quantity"
          label="Total Quantity"
          rules={[
            { required: true },
            { type: 'number', min: 0, max: Number(totalSeatByClass) },
          ]}
        >
          <InputNumber />
        </Form.Item>

        <Form.Item
          name="rows_quantity"
          label="Quantity Per Row"
          rules={[
            {
              required: true,
            },
            {
              type: 'number',
              min: 0,
              max: Math.ceil(Number(totalSeatByClass / 10)),
            },
          ]}
        >
          <InputNumber />
        </Form.Item>
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          gap: '10px',
        }}
      >
        <Form.Item>
          <Button danger onClick={onPrev}>
            Back
          </Button>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Next
          </Button>
        </Form.Item>
      </div>
    </Form>
  );
};

export default FormItem;
