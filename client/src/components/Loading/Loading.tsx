import React, { Fragment } from 'react';
import { Spin } from 'antd';

function Loading() {
  return (
    <Fragment>
      <Spin className="globalSpin" size="large"/>
    </Fragment>
  );
}

export default Loading;
