import Payment from "../components/Payment";
import ProductCartItem from "../components/ProductCartItem";
import { Col, Row, Space, Modal, Typography } from "antd";
import ButtonUI from "components/UIKit/ButtonUI";
import "./Cart.scss";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteCart,
  selectCartItems,
  getCart,
  selectTotalPrice,
} from "../cartSlice";
import { Link } from "react-router-dom";
import React, { useState, useCallback, useEffect } from "react";
const { Text } = Typography;

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const totalPrice = useSelector(selectTotalPrice);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleDeleteCart = useCallback(() => {
    dispatch(deleteCart());
    setIsModalVisible(false);
  }, [dispatch]);

  useEffect(() => {
    dispatch(getCart());
  }, [dispatch]);

  return (
    <>
      <Modal
        title="Thông báo ?"
        visible={isModalVisible}
        footer={[
          <ButtonUI
            variant="light"
            onClick={() => {
              setIsModalVisible(false);
            }}
            text="Quay lại"
          />,
          <ButtonUI variant="danger" text="Xóa" onClick={handleDeleteCart} />,
        ]}
      >
        <Text>Bạn có chắc chắn muốn xóa giỏ hàng ?</Text>
      </Modal>
      <Row type="flex" justify="center">
        <Col className="my-5" span={24} xl={20}>
          <Space size={20} className="ps-3">
            <Link to="/">
              <ButtonUI text="Tiếp tục mua hàng" />
            </Link>
            {Array.isArray(cartItems) && cartItems.length > 0 && (
              <ButtonUI
                text="Xóa giỏ hàng"
                variant="danger"
                onClick={() => setIsModalVisible(true)}
              />
            )}
          </Space>
          <Row className="mt-5 " type="flex" justify="center">
            <Col
              span={24}
              sm={13}
              lg={16}
              className="mb-4 px-3 d-flex justify-content-center"
            >
              {cartItems && (
                <Row span={24}>
                  {cartItems.map((item) => (
                    <ProductCartItem key={item.id} product={item} />
                  ))}
                </Row>
              )}
            </Col>
            {Array.isArray(cartItems) && cartItems.length > 0 && (
              <Col span={22} sm={11} lg={8} className="px-5">
                <Payment totalPrice={totalPrice} />
              </Col>
            )}
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default Cart;
