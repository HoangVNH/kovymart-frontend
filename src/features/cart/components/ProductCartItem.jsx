import { Col, Row, Input, Typography, Modal } from "antd";
import ImageWithFallBack from "components/ImageWithFallback";
import { DeleteOutlined, MinusOutlined, PlusOutlined } from "@ant-design/icons";
import ButtonUI from "components/UIKit/ButtonUI";
import Utils from "components/UIKit/Utils";
import PropTypes from "prop-types";
import { updateQuantity, deleteProduct } from "../cartSlice";
import { useDispatch } from "react-redux";
import { getImageOfProduct } from "../../../utils";
import React, { useState, useCallback } from "react";
import { Link } from "react-router-dom";

const { Text, Title } = Typography;

const ProductCartItem = (props) => {
  const product = props.product;
  const dispatch = useDispatch();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleUpdate = useCallback(
    (id, doing) => {
      dispatch(updateQuantity({ id, doing }));
    },
    [dispatch]
  );

  const handleDeleteProduct = useCallback(
    (id) => {
      dispatch(deleteProduct({ id }));
      setIsModalVisible(false);
    },
    [dispatch]
  );

  return (
    <Col span={24} className="rounded-3 mb-3 border p-2 shadow-sm">
      <Modal
        title="Thông báo ?"
        visible={isModalVisible}
        footer={[
          <ButtonUI
            variant="light"
            onClick={() => setIsModalVisible(false)}
            text="Quay lại"
          />,
          <ButtonUI
            variant="danger"
            text="Xóa"
            onClick={() => handleDeleteProduct(product.id)}
          />,
        ]}
      >
        <Text>Bạn có chắc chắn muốn xóa sản phẩm này ?</Text>
      </Modal>

      <Row className="my-3">
        <Col span={8} sm={8} lg={4} className="ps-2">
          <Link to={`/product/${product.productId}`}>
            <ImageWithFallBack
              className="rounded"
              src={getImageOfProduct(product?.productId)}
            />
          </Link>
        </Col>
        <Col span={15} sm={12} lg={10} className="ps-4">
          <Link to={`/product/${product.productId}`}>
            <Title level={5}>
              {product.productName ? (
                product.productName
              ) : (
                <>{product.name ? product.name : "Title"}</>
              )}
            </Title>
          </Link>
          <Typography.Link>
            <Text type="danger" onClick={() => setIsModalVisible(true)}>
              <DeleteOutlined className="align-baseline" /> Xóa sản phẩm
            </Text>
          </Typography.Link>
        </Col>
        <Col
          span={24}
          sm={24}
          className="pe-3 d-flex justify-content-end align-items-end"
        >
          <Title level={5} className="me-4 mb-2">
            {Utils.Money({ money: product.total })}
          </Title>
          <ButtonUI
            className="mb-2"
            onClick={() => handleUpdate(product.id, "decrement")}
            type="default"
            normal={true}
            withIcon={<MinusOutlined />}
          />
          <Input
            className="mb-2 text-center mx-1"
            style={{ maxWidth: "4em" }}
            bordered={true}
            value={product.quantity}
            min={1}
            max={99}
          />
          <ButtonUI
            className="mb-2"
            onClick={() => handleUpdate(product.id, "increment")}
            type="default"
            normal={true}
            withIcon={<PlusOutlined />}
          />
        </Col>
      </Row>
    </Col>
  );
};

ProductCartItem.propTypes = {
  product: PropTypes.object,
};

export default ProductCartItem;
