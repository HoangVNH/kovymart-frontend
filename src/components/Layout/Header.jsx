import React from 'react';
import { Layout, Row, Col } from 'antd';
import { Link } from 'react-router-dom';
import Search from './Search';
import { ShoppingCartOutlined, UserOutlined } from '@ant-design/icons';

const { Header } = Layout;

const MainHeader = () => (
  <Header>
    <Row className="navigation-bar">
      <Col flex={3} className="navigation-bar__left">
        <Link to="/" className="navigation-bar__logo">
          KovyMart
        </Link>
        <Search />
      </Col>
      <Col flex={2} className="navigation-bar__right">
        <Link to="/" >
          <UserOutlined />
          Đăng Nhập
        </Link>
        <Link to="/" className="link--normalize">
          <ShoppingCartOutlined />
          Giỏ Hàng
        </Link>
      </Col>
    </Row>
  </Header>
);

export default MainHeader;
