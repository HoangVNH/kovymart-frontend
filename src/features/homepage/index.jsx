import React from 'react';
import ProductCardList from '../../components/ProductCardList';
import products from './data';
import './styles.scss';

const HomePage = () => {
  const layout = {
    gutter: { xs: 6, sm: 6, md: 6, lg: 6, xl: 6, xxl: 8 },
    span: { xs: 6, sm: 6, md: 6, lg: 6, xl: 6, xxl: 8 }
  };

  return (
    <>
      <ProductCardList
        products={products}
        title="Sữa - Sản phẩm từ sữa"
        layout={layout}
      />
      <ProductCardList
        products={products}
        title="Thịt - Hải sản - Trứng"
        layout={layout}
      />
      <ProductCardList
        products={products}
        title="Rau - Củ - Trái cây"
        layout={layout}  
      />
    </>
  );
};

export default HomePage;
