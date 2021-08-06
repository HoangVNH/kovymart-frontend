import { Col, Row } from 'antd';
import PropTypes from 'prop-types';
import React from 'react';
import ProductCard from '../../components/ProductCard';
import './styles.scss';


const ProductCardList = ({ 
  products,
  title,
  layout,
  className,
  style
}) => (
  <div className="product-list__container">
    <div className={`product-list__header ${className}`} style={style}>
      <span>{title}</span>
    </div>
    <Row
      gutter={{...layout.gutter}}
      className="product-list__wrapper"
    >
      {products.map((product, index) =>
        <Col
          {...layout.span}
          key={product.index}
        >
          <ProductCard
            image={product.image}
            name={product.name}
            price={product.price}
            netPrice={product.netPrice}
            discount={product.discount}
          />
        </Col> 
      )}
    </Row>
  </div>
);

ProductCardList.propTypes = {
  products: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
  className: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ]),
  style: PropTypes.object,
  layout: PropTypes.object
};

ProductCardList.defaultProps = {
  className: '',
  style: {},
  layout: {}
};

export default ProductCardList;

