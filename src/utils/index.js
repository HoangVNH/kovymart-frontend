import images from "../data/img";
import categoryImages from "../data/categoryImgs.js";

export const getImageOfProduct = (id, imageSize = "smallImage") => {
  const formattedId = +id;

  if (formattedId && formattedId !== "undefined") {
    return images.find(({ productId }) => productId === formattedId)[imageSize];
  }
};

export const getImageOfCategory = (id) => {
  return categoryImages.find(({ categoryId }) => categoryId === id)?.image;
};
