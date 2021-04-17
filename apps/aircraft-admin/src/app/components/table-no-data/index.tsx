import React from 'react';
import { SmileOutlined } from '@ant-design/icons';

const NoData = (props) => (
  <div style={{ textAlign: 'center' }}>
    <SmileOutlined style={{ fontSize: 20 }} />
    <p>{props.text}</p>
  </div>
);

export default NoData;
