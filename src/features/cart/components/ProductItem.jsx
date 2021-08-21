import { Col, Row, Input, Typography, Modal } from "antd";
import ImageWithFallBack from "components/ImageWithFallback";
import { DeleteOutlined, MinusOutlined, PlusOutlined } from "@ant-design/icons";
import ButtonUI from "components/UIKit/ButtonUI";
import Utils from "components/UIKit/Utils";
import PropTypes from "prop-types";
import { updateQuantity, deleteProduct } from "../cartSlice";
import { useDispatch } from "react-redux";
import { getImageOfProduct } from "../../../utils";
import { useState } from "react";
const { Text, Title } = Typography;
const ProductItem = (props) => {
  const product = props.product;
  const dispatch = useDispatch();
  function handleUpdate(productId, doing) {
    dispatch(updateQuantity({ productId, doing }));
  }
  function handleDeleteProduct(productId) {
    dispatch(deleteProduct({ productId }));
    setIsModalVisible(false);
  }

  const [isModalVisible, setIsModalVisible] = useState(false);

  return (
    <div className="rounded-3 mb-3 border p-2 shadow-sm">
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
          <ButtonUI
            variant="danger"
            text="Xóa"
            onClick={() => {
              handleDeleteProduct(product.productId);
            }}
          />,
        ]}
      >
        <Text>Bạn có chắc chắn muốn xóa sản phẩm này ?</Text>
      </Modal>
      <Row className="my-3">
        <Col span={8} sm={8} lg={4} className="ps-2">
          <ImageWithFallBack
            className="rounded"
            src={getImageOfProduct(product.productId)}
          />
        </Col>
        <Col span={15} sm={12} lg={10} className="ps-4">
          <Title level={5}>{product.name ? product.name : "Title"}</Title>
          <Typography.Link>
            <Text
              type="danger"
              onClick={() => {
                setIsModalVisible(true);
              }}
            >
              <DeleteOutlined className="align-baseline" /> Xóa sản phẩm
            </Text>
          </Typography.Link>
        </Col>
        <Col
          span={24}
          sm={24}
          lg={10}
          className="pe-3 d-flex justify-content-end align-items-end"
        >
          <h4 className="fw-bold me-4">
            {Utils.Money({ money: product.totalPrice })}
          </h4>
          <ButtonUI
            className="mb-2"
            onClick={() => {
              handleUpdate(product.productId, "decrement");
            }}
            type="default"
            normal={true}
            withIcon={<MinusOutlined />}
          />
          <Input
            className="mb-2 text-center mx-1"
            style={{ maxWidth: "4em" }}
            bordered={true}
            value={product.quantity}
          />
          <ButtonUI
            className="mb-2"
            onClick={() => {
              handleUpdate(product.productId, "increment");
            }}
            type="default"
            normal={true}
            withIcon={<PlusOutlined />}
          />
        </Col>
      </Row>
    </div>
  );
};

ProductItem.propTypes = {
  product: PropTypes.object,
};
export default ProductItem;
