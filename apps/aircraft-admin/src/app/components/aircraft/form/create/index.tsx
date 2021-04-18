import React from 'react';
import { Modal, Form, Input, Select } from 'antd';

interface ICreateAirCraftDTO {
  name: string,
  aircraft_type_id: number,
  status: string
}
interface ICreateAirCraftProps {
  aircraftDTO: any,
  visible: boolean;
  onCreate: (Value: ICreateAirCraftDTO) => void;
  onCancel: () => void;
}

const CreateAirCraftForm: React.FC<ICreateAirCraftProps> = ({
  aircraftDTO,
  visible,
  onCreate,
  onCancel
}) => {

  const [form] = Form.useForm();

  const initialFormValues = {
    name: 'name',
    aircraft_type_id: 0,
    status: 'ACTIVATED'
  }
  const handleSelectStatus = (values) => {
    //TODO: handle select value here
  }

  return (
    <div>
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
            rules={[{ required: true, message: 'Please input aircraft name' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="aircraft_type_id"
            label="Aircraft Type ID"
            rules={[{ required: true, message: 'Please input aircraft type id' }]}
          >
            <Input />
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
            <Select
              placeholder="Select status"
              onChange={handleSelectStatus}
              allowClear
            >
              <Select.Option value="ACTIVATED">ACTIVATED</Select.Option>
              <Select.Option value="DEACTIVATED">DEACTIVATED</Select.Option>
            </Select>
          </Form.Item>

        </Form>
      </Modal>
    </div>
  );
};

export default CreateAirCraftForm;
