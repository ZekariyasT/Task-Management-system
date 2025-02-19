import api from "./api";

export const registerUser = async (data: {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}) => {
  return api.post("/register", data);
};

export const loginUser = async (data: { email: string; password: string }) => {
  return api.post("/login", data);
};

export const logoutUser = async () => {
  return api.post("/logout");
};
