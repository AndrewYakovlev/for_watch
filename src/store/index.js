import { createStore } from "vuex";

import ui from "@/store/modules/ui";

import uoms from "@/store/modules/uoms";

import brigades from "@/store/modules/brigades";
import cashboxes from "@/store/modules/cashboxes";
import documentTemplates from "@/store/modules/documentTemplates";
import employees from "@/store/modules/employees";
import expenses from "@/store/modules/expenses";
import legals from "@/store/modules/legals";
import offices from "@/store/modules/offices";
import statuses from "@/store/modules/statuses";
import storages from "@/store/modules/storages";
import suppliers from "@/store/modules/suppliers";
import auth from "@/store/modules/auth";

export default createStore({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    auth,
    ui,
    uoms,
    brigades,
    cashboxes,
    documentTemplates,
    employees,
    expenses,
    legals,
    offices,
    statuses,
    storages,
    suppliers,
  },
});
