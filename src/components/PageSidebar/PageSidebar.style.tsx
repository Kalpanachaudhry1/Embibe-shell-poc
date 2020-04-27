import { Typography } from 'antd';
import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const { Title } = Typography;

const Brandname = styled(Title)`
    color: #fff !important;
`;

const BrandContainer: FC<{}> = styled.div`
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Brand: FC<{}> = () => (
    <BrandContainer>
        <Link to='/'><Brandname level={4}>Embibe</Brandname></Link>
    </BrandContainer>
);

export default Brand;
