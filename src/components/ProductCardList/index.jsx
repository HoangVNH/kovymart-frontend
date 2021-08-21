import { Col, Row } from "antd";
import PropTypes from "prop-types";
import React from "react";
import { getImageOfProduct } from "utils";
import ProductCard from "../../components/ProductCard";
import "./styles.scss";

const ProductCardList = ({
  products,
  title,
  layout,
  className,
  style,
  onClickHandler,
}) => {
  const imageSize = "smallImage";

  return (
    <div className="product-list__container">
      <div className={`product-list__header ${className}`} style={style}>
        <span>{title}</span>
      </div>
      <Row gutter={{ ...layout.gutter }} className="product-list__wrapper">
        {products.map((product) => (
          <Col {...layout.span} key={`${product.id + product.categoryId}`}>
            <ProductCard
              id={product.id}
              image={getImageOfProduct(product.id, imageSize)}
              name={product.productName}
              price={product.price}
              netPrice={product.netPrice}
              discount={product.discount}
              onAddToCart={onClickHandler}
            />
          </Col>
        ))}
      </Row>
    </div>
  );
};

ProductCardList.propTypes = {
  products: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  style: PropTypes.object,
  layout: PropTypes.object,
  onClickHandler: PropTypes.func,
};

ProductCardList.defaultProps = {
  className: "",
  style: {},
  layout: {},
  onClickHandler: () => {},
};

export default ProductCardList;
