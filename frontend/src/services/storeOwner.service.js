import api from "./api";

const getDashboard = async () => {
  const response = await api.get("/store-owner/dashboard");
  return response.data;
};

const storeOwnerService = {
  getDashboard,
};

export default storeOwnerService;
