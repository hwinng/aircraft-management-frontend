import React, { Fragment, useState, useCallback } from 'react';
import './style.scss';
import { connect, DispatchProp } from 'react-redux';
import { Row, Col, Card, Avatar, Button, Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';
import EditAccount from '../account-form/EditAccount';
import { getNameLetter } from '../../../utils/getNameLetter';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import {
  IUpdateProfileDTO,
  IUpdateAccountDTO,
} from '../../../services/account';
import {
  getAccountById,
  updateAccountProfile,
} from '../../../store/actions/account';

type ThunkDispatchProps = ThunkDispatch<{}, {}, AnyAction>;
type DispatchProps = {
  account: any;
  dispatch: ThunkDispatchProps;
} & DispatchProp;

const AccountDetail: React.FC<DispatchProps> = ({ account, dispatch }) => {
  const [visible, setVisible] = useState(false);
  const { account_profile, isLoading } = account;

  const onEdit = (values: any) => {
    const profileDTO: IUpdateProfileDTO = {
      id: account_profile.userInfo.id,
      user_id: account_profile.userInfo.id,
      id_card_number: values.id_card_number,
      credit_card_number: values.credit_card_number,
      phoneNumber: values.phone_number,
    };
    const accountDTO: IUpdateAccountDTO = {
      name: values.name,
      username: values.username,
      imageUrl: account_profile.userInfo.imageUrl,
      email: values.email,
      role: values.role,
    };
    dispatch(
      updateAccountProfile(account_profile.userInfo.id, accountDTO, profileDTO)
    );
    dispatch(getAccountById(account_profile.userInfo.id));
    setVisible(false);
  };

  const buildInfoRow = (title, value) => (
    <Row
      style={{
        marginTop: '2rem',
        marginBottom: '2rem',
        borderBottom: '1px solid #eee',
        paddingBottom: '2rem',
      }}
    >
      <Col span={8} style={{ paddingRight: 10 }}>
        {title}
      </Col>
      <Col span={16}>{value}</Col>
    </Row>
  );

  return isLoading ? (
    <div>Loading...</div>
  ) : (
    <Fragment>
      <Row style={{ marginBottom: '1rem' }}>
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link to="/home/account">Account</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <Link to="">Detail</Link>
          </Breadcrumb.Item>
        </Breadcrumb>
      </Row>
      <Row gutter={8}>
        <Col xs={24} sm={24} md={24} lg={8} xl={8}>
          <Card
            cover={
              <Avatar
                style={{
                  backgroundColor: '#f56a00',
                  borderRadius: '50%',
                  width: '156px',
                  height: '156px',
                  margin: 'auto',
                  marginTop: '1rem',
                  alignItems: 'center',
                  justifyContent: 'center',
                  display: 'flex',
                }}
                size="large"
              >
                {React.createElement(
                  'span',
                  {
                    style: {
                      fontSize: '5rem',
                    },
                  },
                  getNameLetter(
                    account_profile.userInfo.name
                      .split(' ')
                      .slice(-1)
                      .toString()
                      .slice(0, 1)
                  )
                )}
              </Avatar>
            }
          >
            <Card.Meta
              title={`${account_profile.userInfo.name}`}
              style={{ textAlign: 'center' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={24} md={24} lg={16} xl={16}>
          <Card title={`Detail information of account`}>
            {true && (
              <>
                {buildInfoRow('Username:', account_profile.userInfo.username)}
                {buildInfoRow('Name:', account_profile.userInfo.name)}
                {buildInfoRow('Email:', account_profile.userInfo.email)}
                {buildInfoRow('Image Link:', account_profile.userInfo.imageUrl)}
                {buildInfoRow(
                  'Role:',
                  account_profile.userInfo.roles.map((x) => x.name).toString()
                )}
                {buildInfoRow(
                  'Phone Number:',
                  account_profile.phone_number
                    ? account_profile.phone_number
                    : 'Empty'
                )}
                {buildInfoRow(
                  'Credit Card No:',
                  account_profile.credit_card_number
                    ? account_profile.credit_card_number
                    : 'Empty'
                )}
                {buildInfoRow(
                  'ID Card No:',
                  account_profile.id_card_number
                    ? account_profile.id_card_number
                    : 'Empty'
                )}
              </>
            )}
            <Button type="primary" onClick={() => setVisible(true)}>
              Edit
            </Button>
            <EditAccount
              profileDTO={account_profile}
              visible={visible}
              onEdit={onEdit}
              onCancel={() => {
                setVisible(false);
              }}
            />
          </Card>
        </Col>
      </Row>
    </Fragment>
  );
};

export default connect()(AccountDetail);
