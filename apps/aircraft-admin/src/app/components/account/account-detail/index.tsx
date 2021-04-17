import React, { Fragment, useState, useCallback } from 'react';
import './style.scss';
import { Row, Col, Card, Avatar, Button, Breadcrumb } from 'antd';
import { Link } from 'react-router-dom'
import EditAccount from '../account-form/EditAccount'

const AccountDetail = () => {

    const [visible, setVisible] = useState(false);

    const onEdit = (values: any) => {
      console.log('Received values of form: ', values);
      setVisible(false);
    };

    const buildInfoRow = (title, value) => (
        <Row style={{
            marginTop: '2rem',
            marginBottom: '2rem',
            borderBottom: '1px solid #eee',
            paddingBottom: '2rem'
        }}>
            <Col span={8} style={{paddingRight: 10}}>{title}</Col>
            <Col span={16}>{value}</Col>
        </Row>
    );

    return (
      <Fragment>
          <Row style={{marginBottom: '1rem'}}>
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
              <Col
                  xs={24}
                  sm={24}
                  md={24}
                  lg={8}
                  xl={8}
              >
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
                                      fontSize: '5rem'
                                  }
                              },
                              'A'
                          )}
                        </Avatar>
                      }
                  >
                      <Card.Meta title='Account name' style={{ textAlign: 'center'}} />
                      {
                          true &&
                          <>
                              {buildInfoRow("StudentID:", 'username')}
                              {buildInfoRow("Birthday:", 'birthday' )}
                          </>
                      }
                  </Card>
              </Col>
              <Col
                  xs={24}
                  sm={24}
                  md={24}
                  lg={16}
                  xl={16}
              >
                  <Card
                      title={`Detail information of account`}
                  >
                      {
                          true &&
                          <>
                              {buildInfoRow("ID:", '1')}
                              {buildInfoRow("Username:", 'username')}
                              {buildInfoRow("Name:", 'name')}
                              {buildInfoRow("Email:", 'email')}
                              {buildInfoRow("Card ID:", 'card id')}
                              {buildInfoRow("Credit No:", 'credit no')}
                          </>
                      }
                      <Button type='primary' onClick={() => setVisible(true)}>
                        Edit
                      </Button>
                      <EditAccount
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
    )
}

export default AccountDetail
