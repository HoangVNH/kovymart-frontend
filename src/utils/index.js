// export const formatCurrency = price => {
//   if (price) {
//     const result = Number(price);

//     return result.toFixed(3).replace(/(\d)/g, );
//   }
// }

import images from '../data/img';

export const getImageOfProduct = (id) =>
  images.find(image => image.productId === id)?.image;
