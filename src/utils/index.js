import images from "../data/img";

export const getImageOfProduct = (id, imageSize = "smallImage") => {
  console.log(id);
  const formattedId = +id;

  if (formattedId && formattedId !== "undefined") {
    return images.find(({ productId }) => productId === formattedId)[imageSize];
  }
};
