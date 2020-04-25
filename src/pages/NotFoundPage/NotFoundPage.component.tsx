import { Button, Result } from 'antd';
import React, { FC, memo } from 'react';
import { Link } from 'react-router-dom';

export const NotFoundPage: FC<{}> = () => (
  <Result
    status={404}
    title='404'
    subTitle='Sorry, the page you visited does not exist.'
    extra={
    (
      <Button type='primary'>
        <Link to='/jobs'>
          Jobs page
        </Link>
      </Button>
    )
}
  />
);

export default memo(NotFoundPage);
