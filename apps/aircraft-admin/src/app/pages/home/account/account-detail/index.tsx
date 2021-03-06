import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './style.scss';

import { useLocation } from 'react-router';
import { StoreState } from 'apps/aircraft-admin/src/app/store';
import {
  getAccountById,
  updateAccount,
  updateProfile,
} from 'apps/aircraft-admin/src/app/store/actions/account';
import { Row, Breadcrumb, Col, Card, Avatar, Button, Spin } from 'antd';
import { Link } from 'react-router-dom';
import EditAccount from 'apps/aircraft-admin/src/app/components/account/account-form/EditAccount';
import { getNameLetter } from 'apps/aircraft-admin/src/app/utils/getNameLetter';
import {
  IUpdateProfileDTO,
  IUpdateAccountDTO,
} from 'apps/aircraft-admin/src/app/services';

const AccountDetailContainer = function () {
  const dispatch = useDispatch();
  const account = useSelector((state: StoreState) => state.account);
  const profile = account.account_profile;
  const location = useLocation();
  const [visible, setVisible] = React.useState(false);

  const paramId = Number(
    location.pathname.slice('/home/account/detail/'.length)
  );

  React.useEffect(() => {
    getAccountById(paramId)
      .then(
        (res) => dispatch(res),
        (err) => dispatch(err)
      )
      .finally(() => {});
  }, [getAccountById, paramId]);

  function buildInfoRow(title, value) {
    return (
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
  }

  function handleEdit(values: any) {
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
      .finally(() => {
        getAccountById(profile.userInfo.id).then((res) => dispatch(res));
        setVisible(false);
      });
  }

  return account.isLoading && !profile ? (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <Spin tip="loading..."></Spin>
    </div>
  ) : (
    <div>
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
                {profile ? (
                  <>
                    <span style={{ fontSize: '5rem' }}>
                      {getNameLetter(
                        profile.userInfo.name
                          .split(' ')
                          .slice(-1)
                          .toString()
                          .slice(0, 1)
                      )}
                    </span>{' '}
                  </>
                ) : (
                  'A'
                )}
              </Avatar>
            }
          >
            <Card.Meta
              title={profile && `${profile.userInfo.name}`}
              style={{ textAlign: 'center' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={24} md={24} lg={16} xl={16}>
          <Card
            title={`Detail information of account`}
            style={{ position: 'relative' }}
          >
            {true && (
              <>
                {buildInfoRow(
                  'Username:',
                  profile && profile.userInfo.username
                )}
                {buildInfoRow('Name:', profile && profile.userInfo.name)}
                {buildInfoRow('Email:', profile && profile.userInfo.email)}
                {buildInfoRow(
                  'Image Link:',
                  profile && profile.userInfo.imageUrl
                )}
                {buildInfoRow(
                  'Role:',
                  profile &&
                    profile.userInfo.roles.map((x) => x.name).toString()
                )}
                {buildInfoRow(
                  'Phone Number:',
                  profile && profile.phone_number
                    ? profile.phone_number
                    : 'Empty'
                )}
                {buildInfoRow(
                  'Credit Card No:',
                  profile && profile.credit_card_number
                    ? profile.credit_card_number
                    : 'Empty'
                )}
                {buildInfoRow(
                  'ID Card No:',
                  profile && profile.id_card_number
                    ? profile.id_card_number
                    : 'Empty'
                )}
              </>
            )}
            <Button
              style={{
                position: 'absolute',
                bottom: '1rem',
                left: '50%',
              }}
              type="primary"
              onClick={() => setVisible(true)}
            >
              Edit
            </Button>
            {profile && (
              <EditAccount
                profileDTO={profile}
                visible={visible}
                onEdit={handleEdit}
                onCancel={() => {
                  setVisible(false);
                }}
              />
            )}
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default AccountDetailContainer;
