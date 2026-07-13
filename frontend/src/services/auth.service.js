import api from "./api";

const login = async (data) => {
  const response = await api.post("/auth/login", data);
  return response.data;
};

const register = async (data) => {
  const response = await api.post("/auth/register", data);
  return response.data;
};

const getCurrentUser = async () => {
  const response = await api.get("/auth/me");
  return response.data;
};

const changePassword = async (data) => {
  const response = await api.put("/auth/change-password", data);
  return response.data;
};

export default {
  login,
  register,
  getCurrentUser,
  changePassword,
};