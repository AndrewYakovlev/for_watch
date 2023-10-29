import axios from "axios";
import { getItem, setItem } from "@/helpers/persistanceStorage";

axios.defaults.baseURL = "http://localhost:3000/";
axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
axios.interceptors.request.use((config) => {
  const token = getItem("accessToken");
  config.headers.Authorization = token ? "Token " + token : "";
  return config;
});

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (!error.response) {
      console.log('NETWORK ERROR');
    } else {
      const originalRequest = error.config;

      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true
        setItem('accessToken', '');
        window.location.href = '/signin';
      }
      return Promise.reject(error);
    }
  }
);

export default axios;
