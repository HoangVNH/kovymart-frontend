import {
  getProductsByCategoryId,
  selectProduct,
} from "features/product/productSlice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductCardList from "../../components/ProductCardList";
import "./styles.scss";

const HomePage = () => {
  const dispatch = useDispatch();
  const productData = useSelector(selectProduct);
  const { productList1, productList2, productList3 } = productData;
  const layout = {
    gutter: { xs: 8, sm: 8, md: 8, lg: 8, xl: 8, xxl: 8 },
    span: { xs: 6, sm: 6, md: 6, lg: 6, xl: 6, xxl: 6 },
  };

  useEffect(() => {
    dispatch(getProductsByCategoryId(1));
  }, [dispatch]);

  useEffect(() => {
    dispatch(getProductsByCategoryId(2));
  }, [dispatch]);

  useEffect(() => {
    dispatch(getProductsByCategoryId(3));
  }, [dispatch]);

  return (
    <>
      <ProductCardList
        products={productList1.slice(0, 4)}
        title="Rau - Củ - Trái cây"
        layout={layout}
      />
      <ProductCardList
        products={productList2.slice(0, 4)}
        title="Thịt - Hải sản - Trứng"
        layout={layout}
      />
      <ProductCardList
        products={productList3.slice(0, 4)}
        title="Dầu ăn - Gia vị - Đồ khô"
        layout={layout}
      />
    </>
  );
};

export default HomePage;
