import api from "@/api/documentTemplates";

const module = "documentTemplates";

const state = {
  rows: [],
  total: 0,
  lastUpdate: null,
  loading: false,
  errors: null,
};

export const mutationTypes = {
  loadStart: `[${module}] loadStart`,
  loadSuccess: `[${module}] loadSuccess`,
  loadFailure: `[${module}] loadFailure`,

  silentUpdateStart: `[${module}] silentUpdateStart`,
  silentUpdateSuccess: `[${module}] silentUpdateSuccess`,
  silentUpdateFailure: `[${module}] silentUpdateFailure`,
};

const mutations = {
  [mutationTypes.loadStart](state) {
    state.loading = true;
  },
  [mutationTypes.loadSuccess](state, payload) {
    state.rows = payload.rows;
    state.loading = false;
    state.total = payload.total;
    state.lastUpdate = payload.time;
  },
  [mutationTypes.loadFailure](state, error) {
    state.loading = false;
    state.errors = error;
  },

  [mutationTypes.silentUpdateStart](state) {},
  [mutationTypes.silentUpdateSuccess](state, payload) {
    state.rows = payload.rows;
    state.total = payload.total;
    state.lastUpdate = payload.time;
  },
  [mutationTypes.silentUpdateFailure](state, error) {
    state.errors = error;
  },
};

export const actionTypes = {
  load: `[${module}] load`,
  silentUpdate: `[${module}] silentUpdate`,
  save: `[${module}] save`,
  remove: `[${module}] remove`,
};

const actions = {
  [actionTypes.load](context, params) {
    return new Promise((resolve) => {
      context.commit(mutationTypes.loadStart);
      api.get(params)
        .then(response => {
          context.commit(mutationTypes.loadSuccess, response.data)
          resolve(response.data);
        })
        .catch(err => {
          context.commit(mutationTypes.loadFailure, err)
        })
    });
  },
  [actionTypes.silentUpdate](context, params) {
    return new Promise((resolve) => {
      context.commit(mutationTypes.silentUpdateStart);
      api.get(params)
        .then(response => {
          context.commit(mutationTypes.silentUpdateSuccess, response.data)
          resolve(response.data)
        })
    });
  },
  [actionTypes.save](context, item) {
    return new Promise((resolve) => {});
  },
  [actionTypes.remove](context, id) {
    return new Promise((resolve) => {});
  },
};

export default {
  state,
  mutations,
  actions,
};
