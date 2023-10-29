import axios from "@/api/axios";

const searchAddress = (query) => {
  return axios.get("api/autocomplete/address", { params: { query } });
};

export default {
  searchAddress
}
