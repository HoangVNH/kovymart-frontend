import { getProductList, selectProduct } from 'features/product/productSlice';
import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ProductCardList from '../../components/ProductCardList';
// import products from './data';
import './styles.scss';

const HomePage = () => {
  const dispatch = useDispatch();

  const productData = useSelector(selectProduct);

  const { list } = productData;

  const layout = {
    gutter: { xs: 8, sm: 8, md: 8, lg: 8, xl: 8, xxl: 8 },
    span: { xs: 6, sm: 6, md: 6, lg: 6, xl: 6, xxl: 6 }
  };

  const handleAddToCart = useCallback(() => {
    console.log('added to cart!');
  });

  useEffect(() => {
    dispatch(getProductList());
  }, [dispatch]);

  return (
    <>
      <ProductCardList
        products={list.slice(0, 4)}
        title="Sữa - Sản phẩm từ sữa"
        layout={layout}
        onClickHandler={handleAddToCart}
      />
      <ProductCardList
        products={list.slice(4, 8)}
        title="Thịt - Hải sản - Trứng"
        layout={layout}
      />
      <ProductCardList
        products={list.slice(8, 12)}
        title="Rau - Củ - Trái cây"
        layout={layout}  
      />
    </>
  );
};

export default HomePage;
