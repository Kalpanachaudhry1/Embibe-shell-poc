import { CoffeeOutlined } from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import React, { FC, memo } from 'react';

import { Link } from 'react-router-dom';
import { AppLayoutInterface } from './interfaces';
import Brand from './PageSidebar.style';

const { Sider } = Layout;
const { Item } = Menu;

const Sidebar: FC<AppLayoutInterface> = ({ selectedPath }) => (
    <Sider
      collapsed
      style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
        }}
    >
        <Brand />
        <Menu
          mode='inline'
          defaultSelectedKeys={[selectedPath]}
          selectedKeys={[selectedPath]}
        >
            <Item key='/jobs'>
                <Link to='/jobs' aria-label='link-to-jobs'>
                    <CoffeeOutlined />
                </Link>
            </Item>
        </Menu>
    </Sider>
);

export default memo(Sidebar);
