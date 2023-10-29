import axios from '@/api/axios'

const getCurrentUser = () => {
  return axios.get("api/auth");
};

const getSmsCode = (data) => {
  return axios.post("api/auth/get-sms-code", data);
};

const confirmSmsCode = (data) => {
  return axios.post("api/auth/confirm-sms-code", data);
};

const signUp = (data) => {
  return axios.post("api/auth/createInstance", data);
};

const activateInstance = (data) => {
  return axios.post("api/auth/activate-instance", data);
};

const changeCompanyName = (data) => {
  return axios.post("api/auth/change-company-name", data);
};

export default {
  getCurrentUser,
  getSmsCode,
  confirmSmsCode,
  signUp,
  activateInstance,
  changeCompanyName,
};
