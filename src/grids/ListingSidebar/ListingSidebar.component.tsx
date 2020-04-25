/* eslint-disable react/jsx-props-no-spreading */
import { Drawer } from 'antd';
import { DrawerProps } from 'antd/lib/drawer/index';
import React, { FC, memo } from 'react';

const ListingSidebar: FC<DrawerProps> = ({
    visible = false,
    getContainer,
    ...rest
}: DrawerProps) => (
    <Drawer
      visible={visible}
      destroyOnClose
      getContainer={getContainer}
      mask={false}
      keyboard
      {...rest}
    />
);

export default memo(ListingSidebar);
