import React from 'react';
import { Layout, Row, Col } from 'antd';
import { Link } from 'react-router-dom';
import Search from './Search';
import { ShoppingCartOutlined, UserOutlined } from '@ant-design/icons';

const { Header } = Layout;

const MainHeader = () => {
  const handleLogin = (e) => {
    console.log('hehe');
  }

  return (
    <Header>
      <Row className="navigation-bar">
        <Col flex={3} className="navigation-bar__left">
          <Link to="/" className="navigation-bar__logo">
            KovyMart
          </Link>
          <Search />
        </Col>
        <Col flex={2} className="navigation-bar__right">
          <button
            type="button"
            className="navigation-bar__login"
            onClick={handleLogin}
          >
            <UserOutlined className="vertical-align-icon"/>
            <span>Đăng Nhập</span>
          </button>
          <Link to="/" className="link--normalize">
            <ShoppingCartOutlined className="vertical-align-icon"/>
            <span>Giỏ Hàng</span>
          </Link>
        </Col>
      </Row>
    </Header>
  );
};

export default MainHeader;
