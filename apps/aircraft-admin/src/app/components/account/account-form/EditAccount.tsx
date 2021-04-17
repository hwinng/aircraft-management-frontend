import React from 'react'
import { Modal, Form, Input} from 'antd';

interface IEditAccountDTO {
  id: string,
  name: string,
  username: string,
  email: string,
  phoneNumber: string,
  provider:string,
  cardID: any,
  creditNo: string,
  role: string
}

interface EditAccountFormProps {
  visible: boolean;
  onEdit: (Value: IEditAccountDTO) => void;
  onCancel: () => void;
}

const EditAccount: React.FC<EditAccountFormProps>= ({ visible, onCancel, onEdit }) => {
  const [form] = Form.useForm();
  const initialFormValues = {
    id: '1',
    name: 'Nguyen Van A',
    username: 'username',
    email: 'a1@gmail.com',
    imageUrl: '',
    provider: '',
    providerId: '',
    status: 'string',
    role: 'string'
  }
  return (
    <Modal
      visible={visible}
      title="Edit Account"
      okText="Save"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then(values => {
            form.resetFields();
            onEdit(values);
          })
          .catch(info => {
            console.log('Validate Failed:', info);
          });
      }}
    >
      <Form
        form={form}
        layout="vertical"
        name="edit_account_form"
        initialValues={initialFormValues}
      >
        <Form.Item
          name="name"
          label="Name"
          rules={[{ required: true, message: 'Please input the title of collection!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="username" label="Username">
          <Input />
        </Form.Item>
        <Form.Item name="email" label="Email">
          <Input />
        </Form.Item>
        <Form.Item name="phone" label="Email">
          <Input />
        </Form.Item>
        <Form.Item name="email" label="Email">
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default EditAccount
