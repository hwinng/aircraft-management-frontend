import React from 'react';
import { Modal, Form, Input, Select, Spin } from 'antd';
import { ICreateAirCraftDTO } from '../../../../services/aircraft';

interface ICreateAirCraftProps {
  types: any;
  visible: boolean;
  onCreate: (Value: ICreateAirCraftDTO) => void;
  onCancel: () => void;
  loading: boolean;
}

const CreateAirCraftForm: React.FC<ICreateAirCraftProps> = ({
  types,
  visible,
  onCreate,
  onCancel,
  loading,
}) => {
  //transform types
  types = types.map((ele, _) => {
    return {
      id: ele.id,
      name: ele.name,
    };
  });

  const [form] = Form.useForm();
  const initialFormValues: ICreateAirCraftDTO = {
    name: '',
    aircraft_type_id: 1,
    status: 'ACTIVATED',
  };

  return (
    <div>
      {loading ? (
        <Spin tip="Generating..."></Spin>
      ) : (
        <Modal
          visible={visible}
          title="Create Aircraft"
          okText="Save"
          cancelText="Cancel"
          onCancel={onCancel}
          onOk={() => {
            form
              .validateFields()
              .then((values) => {
                form.resetFields();
                onCreate(values);
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
              rules={[
                { required: true, message: 'Please input aircraft name' },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="aircraft_type_id"
              label="Aircraft Type ID"
              rules={[
                { required: true, message: 'Please select aircraft type' },
              ]}
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
      )}
    </div>
  );
};

export default CreateAirCraftForm;
