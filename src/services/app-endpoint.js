export const BASE_URL = "http://localhost:8080/api/v1";
 export const APP_ENPOINT ={
  createUser: "/register",
  login: "/login",
  forgotPassword: "/password/forgot",
  userLogout: "/logout",
  updatePassword: "/password/update",
  createproduct: "/admin/product/new",
  getProducts: "/products",
  getProductDetails: "/Product/",
  createProductReview: "/review/",
  productReviews: "/reviews",
  deleteProduct: "/admin/product/",
  updateProduct: "/admin/product/",
};

export const generateUrl = (endpoint) => {
  return BASE_URL + endpoint;
};
// "http://localhost:8080/api/v1"  + "/admin/product/new"
// "http://localhost:8080/api/v1/admin/product/new"
