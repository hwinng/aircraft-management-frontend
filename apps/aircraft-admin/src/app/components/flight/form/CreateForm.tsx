import { Modal, Form, Input, Select } from 'antd';
import { types } from 'node:util';
import React from 'react'

const CreateFlightForm = ({
  visible,
  onCreate,
  onCancel
}) => {

  const [form] = Form.useForm();

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
          initialValues={{}}
        >
          <Form.Item
            name='test'
          >
            <Input></Input>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default CreateFlightForm
