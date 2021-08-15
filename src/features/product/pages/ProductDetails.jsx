import "./ProductDetails.scss";

import { Col, Row, Tag, Skeleton } from "antd";
import { ShoppingCartOutlined, CheckOutlined } from "@ant-design/icons";
import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import ImageWithFallBack from "components/ImageWithFallback";
import Utils from '../../../components/UIKit/Utils';
import ButtonUI from '../../../components/UIKit/ButtonUI';
import { getProductById, selectProductDetail } from '../productSlice';
import { useDispatch, useSelector } from "react-redux";
import { getImageOfProduct } from '../../../utils';
import ReactHtmlParser from 'react-html-parser';

const ProductDetails = () => {
  const dispatch = useDispatch()
  const { productId } = useParams();
  const productDetail = useSelector(selectProductDetail);
  const imageSize = 'largeImage';

  const { name, price, description, discount } = productDetail;

  console.log(getImageOfProduct(productId));

  useEffect(() => {
    if (Number(productId)) {
      dispatch(getProductById(productId));
    }
  }, [dispatch, productId]);

  const handleClick = () => {
    alert("clicked")
    console.log("handleclikc")
  };

    return productId ?
    <Col
      className="container my-5 shadow-sm  border border-1 rounded p-5"
      span={16}
    >
      <Row>
        <Col lg={12} className="pe-5">
          <ImageWithFallBack 
            className="rounded"
            src={getImageOfProduct(productId, imageSize)}
          />
        </Col>
        <Col lg={12} className="px-2">
          <Tag className="mb-2 fw-bold" color="warning">
            {discount}% OFF
          </Tag>
          <br />
          <h2 className="fw-bold mb-0"> {name}</h2>
          <div className="text-muted mb-5">
            {/* <CheckCircleOutlined className="me-2 align-baseline" />
            <span className="mb-2"></span>Sẵn có 5kg */}
          </div>
          <div className="text-wrap lh-1 mb-3">
            <h4 className="fw-bold" style={{ lineHeight: "0" }}>
              Giá:
              {Utils.Money({ money: price })}
            </h4>
            <span className="text-muted text-decoration-line-through">
              {Utils.Money({ money: price * (1 + discount * 0.01) })}
            </span>
            <h5 className="text-muted">(Đã tính thuế)</h5>
          </div>
          <Link to={`/cart`}>
            <ButtonUI
              text="Mua ngay"
              withIcon={<ShoppingCartOutlined className="align-baseline" />}
            />
          </Link>
          <div className="mt-5">
            <span>Lý do nên mua sản phẩm ?</span>
            <br />
            <span className="text-info">
              <CheckOutlined className="align-baseline" /> Dễ dàng đổi và hoàn
              trả
            </span>
            <br />
            <span className="text-info">
              <CheckOutlined className="align-baseline" /> Đảm bảo giá cả phải
              chăng
            </span>
          </div>
        </Col>
      </Row>
      <Row className="mt-5">
        <Col lg={16}>
          <div className="mt-4">
            {/* {Utils.Description({ text: `${description}` })} */}
            <div>
              {
                ReactHtmlParser(description)
              }
            </div>
          </div>
        </Col>
      </Row>
    </Col>
  : <Skeleton />
};

export default ProductDetails;
