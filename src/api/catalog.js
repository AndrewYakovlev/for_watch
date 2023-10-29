import axios from "@/api/axios";

const module = "api/catalog";

const getProducts = (filter) => {
  return axios.get(`${module}/products`, { params: filter });
};

const getCategories = (filter) => {
  return axios.get(`${module}/categories`, { params: filter });
};

export default {
  getProducts,
  getCategories
};
