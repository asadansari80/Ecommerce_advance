import axios from "axios";
import { APP_ENPOINT, generateUrl } from "./app-endpoint";

export const createUser = (value) => {
  const payload = {
    email: value.email,
    name: value.name,
    password: value.password,
  };
  // console.log(generateUrl(APP_ENPOINT.createUser), "endpoint");
  return axios.post(generateUrl(APP_ENPOINT.createUser), { ...payload });
};

export const login = (value) => {
  const payload = {
    email: value.email,
    password: value.password,
  };

  return axios.post(generateUrl(APP_ENPOINT.login), { ...payload });
};

export const forgotPassword = (value) => {
  const payload = {
    email: value.email,
  };
  return axios.post(generateUrl(APP_ENPOINT.forgotPassword), { ...payload });
};

export const userLogout = (value) => {
  return axios.get(generateUrl(APP_ENPOINT.userLogout));
};

export const updatePassword = (value) => {
  const payload = {
    oldPassword: value.oldpassword,
    newPassword: value.newpassword,
    confirmPassword: value.confirmpassword,
  };
  const token = localStorage.getItem("token");
  return axios.put(
    generateUrl(APP_ENPOINT.updatePassword),
    { ...payload },
    {
      headers: {
        Authorization: `${token}`,
        "Content-Type": "application/json",
      },
    }
  );
};
