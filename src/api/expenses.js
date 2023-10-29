import axios from "@/api/axios";

const module = 'api/expenses'

const get = (filter) => {
  return axios.get(module, { params: filter });
};

const add = (data) => {
  return axios.post(module, data);
};

const getById = (id) => {
  return axios.get(module, { params: { id: id } });
};

const save = (id, data) => {
  return axios.patch(module + id, data);
};

const remove = (id) => {
  return axios.delete(module + id);
};

export default {
  get,
  add,
  getById,
  save,
  remove,
};
