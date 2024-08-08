import axios from "axios";
import { APP_ENPOINT, generateUrl } from "./app-endpoint";

export const createproduct = (value) => {
  const payload = {
    name: value.productName,
    description: value.discription,
    price: value.price,
    category: value.category,
    Stock: value.stock,
    images: "",
  };
  const token = localStorage.getItem("token");
  return axios.post(
    generateUrl(APP_ENPOINT.createproduct),
    { ...payload },
    {
      headers: {
        Authorization: `${token}`,
        "Content-Type": "application/json",
      },
    }
  );
};

export const getProducts = (pageNo, category, keyword, price) => {
  const token = localStorage.getItem("token");
  return axios.get(
    generateUrl(APP_ENPOINT.getProducts) +
      `?page=${pageNo}${category ? `&category=${category}` : ""}${
        keyword ? `&keyword=${keyword}` : ""
      }${price.minPrice ? `&price[gte]=${price.minPrice}` : ""}${
        price.maxPrice ? `&price[lte]=${price.maxPrice}` : ""
      }`,
    {
      headers: {
        Authorization: `${token}`,
        "Content-Type": "application/json",
      },
    }
  );
};

export const getProductDetails = (id) => {
  // console.log(id);
  const token = localStorage.getItem("token");
  return axios.get(`${generateUrl(APP_ENPOINT.getProductDetails)}${id}`, {
    headers: {
      Authorization: `${token}`,
      "Content-Type": "application/json",
    },
  });
};

export const createProductReview = (star, review, productId) => {
  // console.log("innnnnn");
  const payload = {
    rating: star,
    comment: review,
    productId: productId,
  };
  const token = localStorage.getItem("token");
  // console.log("innnnnn 222", payload);

  return axios.put(generateUrl(APP_ENPOINT.createProductReview), payload, {
    headers: {
      Authorization: `${token}`,
      "Content-Type": "application/json",
    },
  });
};

export const deleteProductReview = (productId, id) => {
  const token = localStorage.getItem("token");

  return axios.delete(
    generateUrl(APP_ENPOINT.productReviews) +
      `?productId=${productId}&id=${id}`,
    {
      headers: {
        Authorization: `${token}`,
        "Content-Type": "application/json",
      },
    }
  );
};

export const deleteProduct = (productId) => {
  const token = localStorage.getItem("token");
  return axios.delete(generateUrl(APP_ENPOINT.deleteProduct) + `${productId}`, {
    headers: {
      Authorization: `${token}`,
      "Content-Type": "application/json",
    },
  });
};

export const updateProduct = (value, id) => {
  const payload = {
    name: value.productName,
    description: value.discription,
    price: value.price,
    category: value.category,
    Stock: value.stock,
    images: "",
  };
  const token = localStorage.getItem("token");
  return axios.put(
    generateUrl(APP_ENPOINT.updateProduct) + `${id}`,
    { ...payload },
    {
      headers: {
        Authorization: `${token}`,
        "Content-Type": "application/json",
      },
    }
  );
};

// export const createProductReview = (value) => {
//   const payload = {
//     rating: value.star,
//     comment: value.review,
//     productId: value,
//   };
//   axios.put();
// };
// createProductReview({
//   star: star,
//   review: review,
// });
// createProductReview(star, review, productId);
