import React from 'react';
import { Row, Col, Card } from 'antd';

const InforComponent = ({ detailInfo }) => {
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

  console.log(detailInfo);
  return (
    <React.Fragment>
      <h2>Information</h2>
      <Card>
        {detailInfo && (
          <>
            {buildInfoRow('Aircraft Name:', detailInfo.name)}
            {buildInfoRow('Aircraft Type ID:', detailInfo.aircraftType.id)}
            {buildInfoRow('Email:', detailInfo.status)}
          </>
        )}
      </Card>
    </React.Fragment>
  );
};

export default InforComponent;
