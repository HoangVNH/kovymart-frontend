import { getProductList } from 'features/product/productSlice';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import ProductCardList from '../../components/ProductCardList';
import products from './data';
import './styles.scss';

const HomePage = () => {
  const dispatch = useDispatch();
  const layout = {
    gutter: { xs: 8, sm: 8, md: 8, lg: 8, xl: 8, xxl: 8 },
    span: { xs: 6, sm: 6, md: 6, lg: 6, xl: 6, xxl: 6 }
  };

  useEffect(() => {
    dispatch(getProductList());
  }, [dispatch]);

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
