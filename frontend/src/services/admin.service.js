import api from "./api";

const getDashboard = async () => {
  const response = await api.get("/admin/dashboard");
  return response.data;
};

const getUsers = async ({
  page = 1,
  limit = 10,
  search = "",
  role = "",
  sortBy = "",
  order = "",
} = {}) => {
  const params = {};
  if (page) params.page = page;
  if (limit) params.limit = limit;
  if (search) params.search = search;
  if (role) params.role = role;
  if (sortBy) params.sortBy = sortBy;
  if (order) params.order = order;

  const response = await api.get("/admin/users", { params });

  return response.data;
};

const getUserById = async (id) => {
  const response = await api.get(`/admin/users/${id}`);
  return response.data;
};

const createUser = async (data) => {
  const response = await api.post("/admin/users", data);
  return response.data;
};

const getStores = async ({
  page = 1,
  limit = 10,
  search = "",
  sortBy = "",
  order = "",
} = {}) => {
  const params = {};
  if (page) params.page = page;
  if (limit) params.limit = limit;
  if (search) params.search = search;
  if (sortBy) params.sortBy = sortBy;
  if (order) params.order = order;

  const response = await api.get("/admin/stores", { params });

  return response.data;
};

const createStore = async (data) => {
  const response = await api.post("/admin/stores", data);
  return response.data;
};

const adminService = {
  getDashboard,
  getUsers,
  getUserById,
  createUser,
  getStores,
  createStore,
};

export default adminService;