import React, { Fragment, useState, useCallback } from 'react';
import './style.scss';
import { useDispatch } from 'react-redux';
import { Row, Col, Card, Avatar, Button, Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';
import EditAccount from '../account-form/EditAccount';
import { getNameLetter } from '../../../utils/getNameLetter';
import {
  IUpdateProfileDTO,
  IUpdateAccountDTO,
} from '../../../services/account';
import {
  getAccountById,
  updateAccount,
  updateProfile,
} from '../../../store/actions/account';

const AccountDetail = ({ profile }) => {
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();

  const onEdit = (values: any) => {
    setVisible(true);
    const profileDTO: IUpdateProfileDTO = {
      id: profile.userInfo.id,
      user_id: profile.userInfo.id,
      id_card_number: values.id_card_number,
      credit_card_number: values.credit_card_number,
      phoneNumber: values.phone_number,
    };
    const accountDTO: IUpdateAccountDTO = {
      name: values.name,
      username: values.username,
      imageUrl: profile.userInfo.imageUrl,
      email: values.email,
      role: values.role,
    };
    Promise.all([
      updateAccount(profileDTO.id, accountDTO),
      updateProfile(profileDTO.id, profileDTO),
    ])
      .then((values: any) => {
        values.forEach((action: any) => {
          dispatch(action);
        });
      })
      .finally(() =>
        getAccountById(profile.userInfo.id).then((res) => dispatch(res))
      );
    // dispatch(getAccountById(profile.userInfo.id));
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

  return (
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
                    profile.userInfo.name
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
              title={`${profile.userInfo.name}`}
              style={{ textAlign: 'center' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={24} md={24} lg={16} xl={16}>
          <Card title={`Detail information of account`}>
            {true && (
              <>
                {buildInfoRow('Username:', profile.userInfo.username)}
                {buildInfoRow('Name:', profile.userInfo.name)}
                {buildInfoRow('Email:', profile.userInfo.email)}
                {buildInfoRow('Image Link:', profile.userInfo.imageUrl)}
                {buildInfoRow(
                  'Role:',
                  profile.userInfo.roles.map((x) => x.name).toString()
                )}
                {buildInfoRow(
                  'Phone Number:',
                  profile.phone_number ? profile.phone_number : 'Empty'
                )}
                {buildInfoRow(
                  'Credit Card No:',
                  profile.credit_card_number
                    ? profile.credit_card_number
                    : 'Empty'
                )}
                {buildInfoRow(
                  'ID Card No:',
                  profile.id_card_number ? profile.id_card_number : 'Empty'
                )}
              </>
            )}
            <Button type="primary" onClick={() => setVisible(true)}>
              Edit
            </Button>
            <EditAccount
              profileDTO={profile}
              visible={visible}
              onEdit={() => {

              }}
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

export default AccountDetail;
