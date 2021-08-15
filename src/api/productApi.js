import axiosClient from './axiosClient';

const productApi = {
  getProductList() {
    const url = '/product';
    return axiosClient.get(url);
  },

  getProductById(id) {
    const url = `/product/${id}`;
    return axiosClient.get(url);
  },

  getProductsByCategoryId(id) {
    const url = `/product?category=${id}`;
    return axiosClient.get(url);
  }
};

export default productApi;
