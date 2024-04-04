export const ITEMS_PER_PAGE = 9;

export const API_URL = "http://localhost:8080/";

export const discountPrice = (product) =>
  Math.round(product.price * (1 - product.discountPercentage / 100));
