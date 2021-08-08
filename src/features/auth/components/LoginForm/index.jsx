import {
  Button,
  Form,
  Input,
  Modal,
  Typography
} from 'antd';
import React from 'react';

const { Title } = Typography;

const LoginForm = ({
  isDisplay,
  formInstance,
  onClose,
  onFinish,
  onRegisterClick,
  isFetching
}) => (
  <Modal
    title={<Title level={4}>Đăng nhập</Title>}
    onCancel={onClose}
    visible={isDisplay}
    footer={null}
  >
    <Form
      form={formInstance}
      onFinish={onFinish}
      layout={'vertical'}
      name="login-form"
    >
      <Form.Item
        label="Email"
        name="email"
        rules={[
          {
            type: 'email',
            message: 'Email không hợp lệ!',
          },
          {
            required: true,
            message: 'Vui lòng nhập email!'
          }
        ]}
      >
        <Input placeholder="Email" autoComplete="off" />
      </Form.Item>
      <Form.Item
        label="Mật khẩu"
        name="password"
        rules={[
          {
            required: true,
            message: 'Vui lòng nhập mật khẩu!'
          }
        ]}
      >
        <Input.Password placeholder="Mật khẩu" autoComplete="off" />
      </Form.Item>

      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          className="full-width-button"
          loading={isFetching}
          disabled={isFetching}
        >
          Đăng nhập
        </Button>
        Chưa có tài khoản?
        <Button
          type="link"
          htmlType="button"
          onClick={onRegisterClick}
          style={{ paddingLeft: 5 }}
        >
          Đăng ký
        </Button>
      </Form.Item>
    </Form>
  </Modal>
);

export default LoginForm;
