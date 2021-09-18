/* eslint-disable jsx-a11y/anchor-is-valid */
import {
  ShoppingCartOutlined,
  UserOutlined,
  PoweroffOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import { Col, Form, Layout, Row, Menu, Dropdown } from "antd";
import {
  selectAuth,
  setSignInMsgToDefault,
  setSignUpMsgToDefault,
  signIn,
  signUp,
} from "features/auth/authSlice";
import { checkAuth, clearAccessToken } from "helper/auth";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { ASYNC_STATUS } from "../../constants";
import LoginForm from "../../features/auth/components/LoginForm";
import RegisterForm from "../../features/auth/components/RegisterForm";
import { NotifyHelper } from "../../helper/notify-helper";
import Search from "./Search";

const { Header } = Layout;

const MainHeader = () => {
  const [isDisplayLoginModal, setIsDisplayLoginModal] = useState(false);
  const [isDisplayRegisterModal, setIsDisplayRegisterModal] = useState(false);
  const [isLoggedOut, setIsLoggedOut] = useState(false);
  const [loginFormInstance] = Form.useForm();
  const [registerFormInstance] = Form.useForm();
  const dispatch = useDispatch();
  const history = useHistory();
  const {
    isFetching,
    signUp: { msg: signUpMsg },
    signIn: { msg: signInMsg },
  } = useSelector(selectAuth);
  const isUserLoggedIn = checkAuth();

  const handleCloseLoginModal = useCallback(() => {
    setIsDisplayLoginModal(false);
    loginFormInstance.resetFields();
  }, [loginFormInstance]);

  const handleCloseRegisterModal = useCallback(() => {
    setIsDisplayRegisterModal(false);
    registerFormInstance.resetFields();
  }, [registerFormInstance]);

  const switchToRegisterModal = useCallback(() => {
    setIsDisplayLoginModal(false);
    loginFormInstance.resetFields();
    setIsDisplayRegisterModal(true);
  }, [loginFormInstance]);

  const switchToLoginModal = useCallback(() => {
    setIsDisplayRegisterModal(false);
    registerFormInstance.resetFields();
    setIsDisplayLoginModal(true);
  }, [registerFormInstance]);

  const handleRegister = useCallback(
    (values) => {
      dispatch(signUp(values));
    },
    [dispatch]
  );

  const handleLogin = useCallback(
    (values) => {
      dispatch(signIn(values));
      setIsLoggedOut(false);
    },
    [dispatch]
  );

  const handleLogout = useCallback(() => {
    clearAccessToken();
    history.push("/");
    setIsLoggedOut(true);
  }, [history]);

  const renderMenuItem = () => {
    const menu = (
      <Menu>
        <Menu.Item
          key="info"
          icon={<InfoCircleOutlined />}
          onClick={() => history.push("/info")}
        >
          Thông Tin
        </Menu.Item>
        <Menu.Item
          key="logout"
          icon={<PoweroffOutlined />}
          onClick={handleLogout}
        >
          Đăng Xuất
        </Menu.Item>
      </Menu>
    );

    return isUserLoggedIn && !isLoggedOut ? (
      <Dropdown overlay={menu}>
        <a
          href="#"
          className="link--normalize"
          onClick={(e) => e.preventDefault()}
        >
          <UserOutlined className="navigation-bar__login" /> Tài Khoản
        </a>
      </Dropdown>
    ) : (
      <button
        type="button"
        className="navigation-bar__login"
        onClick={() => setIsDisplayLoginModal(true)}
      >
        <UserOutlined className="vertical-align-icon" />
        <span>Đăng Nhập</span>
      </button>
    );
  };

  useEffect(() => {
    if (signUpMsg === ASYNC_STATUS.SUCCESS) {
      NotifyHelper.success("Đăng ký thành công", "Thông báo");
      handleCloseRegisterModal();
      dispatch(setSignUpMsgToDefault());
    } else if (signUpMsg === ASYNC_STATUS.ERROR) {
      NotifyHelper.error("Đăng ký thất bại", "Thông báo");
    }
  }, [signUpMsg, handleCloseRegisterModal, dispatch]);

  useEffect(() => {
    if (signInMsg === ASYNC_STATUS.SUCCESS) {
      NotifyHelper.success("Đăng nhập thành công", "Thông báo");
      handleCloseLoginModal();
      dispatch(setSignInMsgToDefault());
    } else if (signInMsg === ASYNC_STATUS.ERROR) {
      NotifyHelper.error("Đăng nhập thất bại", "Thông báo");
    }
  }, [signInMsg, handleCloseLoginModal, dispatch]);

  return (
    <>
      <Header>
        <Row className="navigation-bar">
          <Col flex={3} className="navigation-bar__left">
            <Link to="/" className="navigation-bar__logo link--normalize">
              KovyMart
            </Link>
            <Search />
          </Col>
          <Col flex={2} className="navigation-bar__right">
            {renderMenuItem()}
            {isUserLoggedIn && !isLoggedOut && (
              <Link to="/cart" className="link--normalize navigation-bar__cart">
                <ShoppingCartOutlined className="vertical-align-icon" />
                <span>Giỏ Hàng</span>
              </Link>
            )}
          </Col>
        </Row>
      </Header>

      <LoginForm
        isDisplay={isDisplayLoginModal}
        isFetching={isFetching}
        formInstance={loginFormInstance}
        onClose={handleCloseLoginModal}
        onFinish={handleLogin}
        onRegisterClick={switchToRegisterModal}
      />

      <RegisterForm
        isDisplay={isDisplayRegisterModal}
        isFetching={isFetching}
        formInstance={registerFormInstance}
        onClose={handleCloseRegisterModal}
        onFinish={handleRegister}
        onLoginClick={switchToLoginModal}
      />
    </>
  );
};

export default MainHeader;
