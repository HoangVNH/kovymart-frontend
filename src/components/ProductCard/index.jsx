import { Button, Card, Tag, Tooltip } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import ImageWithFallBack from '../ImageWithFallback';
import './styles.scss';


const ProductCard = ({
  id,
  image,
  name,
  price,
  netPrice,
  discount,
  className,
  style
}) => {
  return (
    <Card
      hoverable
      className={`product-card__wrapper ${className}`}
      style={style}
    >
      <Link to={`/product/${id}`}>
        <div className="product-card__image">
          <Tag color="warning">{discount}%</Tag>
          <ImageWithFallBack src={image} alt={name} />
        </div>
        <Tooltip title={name}>
          <p className="product-card__name">{name}</p>
        </Tooltip>
        <div className="product-card__price-label">
          <p className="product-card__net-price">
            {netPrice}đ
          </p>
          <p className="product-card__price">
            {price}đ
          </p>
        </div>
      </Link>
      <Button className="product-card__button">Thêm vào giỏ</Button>
    </Card>
  )
};

export default ProductCard;
