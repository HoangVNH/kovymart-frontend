import images from "../data/img";

export const getImageOfProduct = (id, imageSize = "smallImage") => {
  const formattedId = +id;

  if (formattedId && formattedId !== "undefined") {
    return images.find(({ productId }) => productId === formattedId)[imageSize];
  }
};
