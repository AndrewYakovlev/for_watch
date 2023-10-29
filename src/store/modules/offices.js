import api from "@/api/offices";

const module = "offices";

const state = {
  rows: [],
  total: 0,
  lastUpdate: null,
  loading: false,
  submitting: false,
  errors: null,
};

export const mutationTypes = {
  loadStart: `[${module}] loadStart`,
  loadSuccess: `[${module}] loadSuccess`,
  loadFailure: `[${module}] loadFailure`,

  silentUpdateStart: `[${module}] silentUpdateStart`,
  silentUpdateSuccess: `[${module}] silentUpdateSuccess`,
  silentUpdateFailure: `[${module}] silentUpdateFailure`,

  saveStart: `[${module}] saveStart`,
  saveSuccess: `[${module}] saveSuccess`,
  saveFailure: `[${module}] saveFailure`,

  removeStart: `[${module}] removeStart`,
  removeSuccess: `[${module}] removeSuccess`,
  removeFailure: `[${module}] removeFailure`,
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

  [mutationTypes.saveStart](state) {
    state.submitting = true;
  },
  [mutationTypes.saveSuccess](state, payload) {
    state.submitting = false;
  },
  [mutationTypes.saveFailure](state, payload) {
    state.submitting = false;
    state.errors = payload;
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
      api
        .get(params)
        .then((response) => {
          context.commit(mutationTypes.loadSuccess, response.data);
          resolve(response.data);
        })
        .catch((err) => {
          context.commit(mutationTypes.loadFailure, err);
        });
    });
  },
  [actionTypes.silentUpdate](context, params) {
    return new Promise((resolve) => {
      context.commit(mutationTypes.silentUpdateStart);
      api.get(params).then((response) => {
        context.commit(mutationTypes.silentUpdateSuccess, response.data);
        resolve(response.data);
      });
    });
  },
  [actionTypes.save](context, item) {
    return new Promise((resolve) => {
      context.commit(mutationTypes.saveStart);
      if (item.id) {
        api
          .save(item.id, item)
          .then((response) => {
            context.commit(mutationTypes.saveSuccess, response.data);
            resolve(response.data);
          })
          .catch((err) => {
            context.commit(mutationTypes.saveFailure, err);
          });
      } else {
        api
          .add(item)
          .then((response) => {
            context.commit(mutationTypes.saveSuccess, response.data);
            resolve(response.data);
          })
          .catch((err) => {
            context.commit(mutationTypes.saveFailure, err);
          });
      }
    });
  },
  [actionTypes.remove](context, id) {
    return new Promise((resolve, reject) => {
      api
        .remove(id)
        .then((response) => {
          resolve(response.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
};

export default {
  state,
  mutations,
  actions,
};
