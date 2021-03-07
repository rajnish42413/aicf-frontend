import React from 'react';
import { Spin } from 'antd';

export default function Loader() {
  return (
    <div style={{ margin: '5rem', textAlign: 'center' }}>
      <Spin />
    </div>
  );
}
