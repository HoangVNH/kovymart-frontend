import React from 'react';
import { Layout } from 'antd';
import { Link } from 'react-router-dom';

const { Header } = Layout;

const MainHeader = () => {
  return (
    <Header>
      <Link to="/" className="header-logo">
        <h2>KovyMart</h2>
      </Link>
  </Header>
  )
};

export default MainHeader;
