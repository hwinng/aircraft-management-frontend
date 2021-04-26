import React from 'react'
import { Modal, Form, Input, Select } from 'antd';

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
  profileDTO: any,
  visible: boolean;
  onEdit: (Value: IEditAccountDTO) => void;
  onCancel: () => void;
}

const EditAccount: React.FC<EditAccountFormProps> = ({ profileDTO, visible, onCancel, onEdit }) => {

  const { credit_card_number, id_card_number, phone_number, userInfo } = profileDTO;
  const [form] = Form.useForm();

  const initialFormValues = {
    name: userInfo.name,
    username: userInfo.username,
    email: userInfo.email,
    role: userInfo.roles.map(x => x.name).toString(),
    credit_card_number,
    id_card_number,
    phone_number,
  }
  const handleSelectRole = (values) => {
    console.log(values)
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
          name="username"
          label="Username"
          rules={[{ required: true, message: 'Please input your username' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="name"
          label="Name"
          rules={[{ required: true, message: 'Please input your name' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="email"
          label="Email"
          rules={[{ required: true, message: 'Please input the title of collection' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="role" label="Role" rules={[{ required: true, message: 'Please input the title of collection' }]}>
          <Select
            placeholder="Select a option and change input text above"
            onChange={handleSelectRole}
            allowClear
          >
            <Select.Option value="ROLE_USER">USER</Select.Option>
            <Select.Option value="ROLE_ADMIN">ADMIN</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="id_card_number"
          label="Card ID Number"
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="credit_card_number"
          label="Credit Card Number"
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="phone_number"
          label="Phone Number"
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default EditAccount
