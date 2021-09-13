import { Button, Card, Tag, Tooltip } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import ImageWithFallBack from "../ImageWithFallback";
import PropTypes from "prop-types";
import Utils from "components/UIKit/Utils";
import "./styles.scss";

const ProductCard = ({
  id,
  image,
  name,
  price,
  netPrice,
  discount,
  className,
  style,
  onAddToCart,
}) => {
  return (
    <Card
      hoverable
      className={`product-card__wrapper ${className}`}
      style={style}
    >
      <Link to={`/product/${id}`}>
        <div className="product-card__image">
          {discount ? <Tag color="warning">{discount}%</Tag> : null}
          <ImageWithFallBack src={image} alt={name} />
        </div>
        <Tooltip title={name}>
          <p className="product-card__name">{name}</p>
        </Tooltip>
      </Link>
      <div className="product-card__price">
        <Link to={`/product/${id}`}>
          <div className="product-card__price--left">
            <span className="product-card__net-price">
              {Utils.Money({ money: price })}
            </span>
          </div>
        </Link>
        <Button className="product-card__button" onClick={onAddToCart}>
          Thêm vào giỏ
        </Button>
      </div>
    </Card>
  );
};

ProductCard.propTypes = {
  id: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  netPrice: PropTypes.number,
  discount: PropTypes.number,
  className: PropTypes.string,
  style: PropTypes.shape({}),
  onAddToCart: PropTypes.func.isRequired,
};

ProductCard.defaultProps = {
  netPrice: 0,
  discount: 0,
  className: "",
  style: {},
};

export default ProductCard;
