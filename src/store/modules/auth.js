import api from '@/api/auth';
import { setItem } from '@/helpers/persistanceStorage';

const module = 'AUTH';

const state = {
  user: null,
  isLoggedIn: false,
};

export const mutationTypes = {
  getUserStart: `[${module}] getUserStart`,
  getUserSuccess: `[${module}] getUserSuccess`,
  getUserFailure: `[${module}] getUserFailure`,

  logout: `[${module}] logout`,
};

export const actionTypes = {
  getCurrentUser: `${module} getCurrentUser`,
  logout: `${module} logout`,
  changeCompanyName: `${module} changeCompanyName`,
};

export const getterTypes = {};

const mutations = {
  [mutationTypes.getUserStart](state) {
    state.loading = true;
  },
  [mutationTypes.getUserSuccess](state, payload) {
    state.loading = false;
    state.user = payload;
    state.isLoggedIn = true;
  },
  [mutationTypes.getUserFailure](state) {
    state.loading = false;
    state.user = null;
    state.isLoggedIn = false;
  },

  [mutationTypes.logout](state) {
    state.user = null;
    state.isLoggedIn = false;
  },
};

const actions = {
  async [actionTypes.getCurrentUser](context) {
    return new Promise((resolve) => {
      context.commit(mutationTypes.getUserStart);
      api
        .getCurrentUser()
        .then((response) => {
          context.commit(mutationTypes.getUserSuccess, response.data);
          resolve(response.data.user);
        })
        .catch((error) => {
          context.commit(mutationTypes.getUserFailure);
          setItem('accessToken', '');
          resolve(error);
        });
    });
  },

  async [actionTypes.changeCompanyName](context, data) {
    return new Promise(resolve => {
      api.changeCompanyName(data)
        .then((response => {
            resolve(response.data)
          })
        );
    });
  },

  [actionTypes.logout](context) {
    setItem('accessToken', '')
    context.commit(mutationTypes.logout);
  },
};

const getters = {};

export default {
  state,
  mutations,
  actions,
  getters,
};
