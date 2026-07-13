import api from "./api";

const getStores = async (params = {}) => {
  const cleanedParams = {};
  Object.keys(params).forEach((key) => {
    if (params[key] !== undefined && params[key] !== null && params[key] !== "") {
      cleanedParams[key] = params[key];
    }
  });
  const response = await api.get("/user/stores", { params: cleanedParams });
  return response.data;
};

const getStoreDetails = async (id) => {
  const response = await api.get(`/user/stores/${id}`);
  return response.data;
};

const submitRating = async (data) => {
  const response = await api.post("/user/ratings", data);
  return response.data;
};

const updateRating = async (storeId, rating) => {
  const response = await api.put(`/user/ratings/${storeId}`, { rating });
  return response.data;
};

const userService = {
  getStores,
  getStoreDetails,
  submitRating,
  updateRating,
};

export default userService;
