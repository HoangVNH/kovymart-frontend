import './LoginPage.scss';

import React from 'react';
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

const LoginPage = () => {
  return (
  <div className="login-page__wrapper">
    <div className="login-page__login-form">
      <Form
        name="normal_login"
        // onFinish={onFinish}
        className="login-form"
      >
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: 'Không được để trống!',
            },
          ]}
        >
          <Input prefix={<UserOutlined />} placeholder="Email" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: 'Không được để trống!',
            },
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Mật khẩu"
          />
        </Form.Item>
        <Form.Item>
          <a href="#" className="login-form-forgot-password">
            Quên mật khẩu?
          </a>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Đăng nhập
          </Button>
        </Form.Item>

        <Form.Item style={{ textAlign: 'center' }}>
          <a href="#">
            Tạo tài khoản
          </a>
        </Form.Item>
      </Form>
    </div>

    <div className="login-page__cover-image">

    </div>
  </div>
)
};

export default LoginPage;
