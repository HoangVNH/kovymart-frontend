import { Button, Form, Input, Modal, Typography } from "antd";
import React from "react";
import PropTypes from "prop-types";
const { Title } = Typography;

const RegisterForm = ({
  isDisplay,
  onClose,
  onFinish,
  formInstance,
  onLoginClick,
  isFetching,
}) => (
  <Modal
    title={<Title level={4}>Đăng ký</Title>}
    onCancel={onClose}
    visible={isDisplay}
    footer={null}
  >
    <Form
      form={formInstance}
      onFinish={onFinish}
      layout={"vertical"}
      name="register-form"
    >
      <Form.Item
        label="Email"
        name="email"
        rules={[
          {
            type: "email",
            message: "Email không hợp lệ!",
          },
          {
            required: true,
            message: "Vui lòng nhập email!",
          },
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
            message: "Please input your password!",
          },
        ]}
        hasFeedback
      >
        <Input.Password placeholder="Mật khẩu" autoComplete="off" />
      </Form.Item>
      <Form.Item
        label="Nhập lại mật khẩu"
        name="confirm"
        dependencies={["password"]}
        hasFeedback
        rules={[
          {
            required: true,
            message: "Please input your password!",
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }

              return Promise.reject(new Error("Mật khẩu không trùng khớp!"));
            },
          }),
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
          Đăng ký
        </Button>
        Đã có tài khoản?
        <Button
          type="link"
          htmlType="button"
          onClick={onLoginClick}
          style={{ paddingLeft: 5 }}
        >
          Đăng nhập
        </Button>
      </Form.Item>
    </Form>
  </Modal>
);

RegisterForm.propTypes = {
  isDisplay: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onFinish: PropTypes.func.isRequired,
  onLoginClick: PropTypes.func.isRequired,
  isFetching: PropTypes.bool,
  formInstance: PropTypes.shape({}),
};

RegisterForm.defaultProps = {
  isFetching: false,
};

export default RegisterForm;
