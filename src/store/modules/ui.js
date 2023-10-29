const state = {
  zIndex: 3000,
  drawers: {
    brigade: {
      visible: false,
      element: null,
    },
    cashbox: {
      visible: false,
      element: null,
    },
    documentTemplate: {
      visible: false,
      element: null,
    },
    employee: {
      visible: false,
      element: null,
    },
    expense: {
      visible: false,
      element: null,
    },
    legal: {
      visible: false,
      element: null,
    },
    office: {
      visible: false,
      element: null,
    },
    status: {
      visible: false,
      element: null,
    },
    storage: {
      visible: false,
      element: null,
    },
    supplier: {
      visible: false,
      element: null,
    },
    uom: {
      visible: false,
      element: null,
    },
  },
};

export const mutationTypes = {
  incrementZIndex: "[ui] incrementZIndex",
  decrementZIndex: "[ui] decrementZIndex",
  toggleBrigadeDrawer: "[ui] toggleBrigadeDrawer",
  toggleCashboxDrawer: "[ui] toggleCashboxDrawer",
  toggleDocumentTemplateDrawer: "[ui] toggleDocumentTemplateDrawer",
  toggleEmployeeDrawer: "[ui] toggleEmployeeDrawer",
  toggleExpenseDrawer: "[ui] toggleExpenseDrawer",
  toggleLegalDrawer: "[ui] toggleLegalDrawer",
  toggleOfficeDrawer: "[ui] toggleOfficeDrawer",
  toggleStatusDrawer: "[ui] toggleStatusDrawer",
  toggleStorageDrawer: "[ui] toggleStorageDrawer",
  toggleSupplierDrawer: "[ui] toggleSupplierDrawer",
  toggleUomDrawer: "[ui] toggleUomDrawer",
};

const mutations = {
  [mutationTypes.incrementZIndex](state) {
    ++state.zIndex;
  },
  [mutationTypes.decrementZIndex](state) {
    --state.zIndex;
  },
  [mutationTypes.toggleBrigadeDrawer](state, payload) {
    state.drawers.brigade.visible = payload.status;
    if (payload.status) state.drawers.brigade.element = payload.element
    else state.drawers.brigade.element = null
  },
  [mutationTypes.toggleCashboxDrawer](state, payload) {
    state.drawers.cashbox.visible = payload.status;
    if (payload.status) state.drawers.cashbox.element = payload.element
    else state.drawers.cashbox.element = null
  },
  [mutationTypes.toggleDocumentTemplateDrawer](state, payload) {
    state.drawers.documentTemplate.visible = payload.status;
    if (payload.status) state.drawers.documentTemplate.element = payload.element
    else state.drawers.documentTemplate.element = null
  },
  [mutationTypes.toggleEmployeeDrawer](state, payload) {
    state.drawers.employee.visible = payload.status;
    if (payload.status) state.drawers.employee.element = payload.element
    else state.drawers.employee.element = null
  },
  [mutationTypes.toggleExpenseDrawer](state, payload) {
    state.drawers.expense.visible = payload.status;
    if (payload.status) state.drawers.expense.element = payload.element
    else state.drawers.expense.element = null
  },
  [mutationTypes.toggleLegalDrawer](state, payload) {
    state.drawers.legal.visible = payload.status;
    if (payload.status) state.drawers.legal.element = payload.element
    else state.drawers.legal.element = null
  },
  [mutationTypes.toggleOfficeDrawer](state, payload) {
    state.drawers.office.visible = payload.status;
    if (payload.status) state.drawers.office.element = payload.element
    else state.drawers.office.element = null
  },
  [mutationTypes.toggleStatusDrawer](state, payload) {
    state.drawers.status.visible = payload.status;
    if (payload.status) state.drawers.status.element = payload.element
    else state.drawers.status.element = null
  },
  [mutationTypes.toggleStorageDrawer](state, payload) {
    state.drawers.storage.visible = payload.status;
    if (payload.status) state.drawers.storage.element = payload.element
    else state.drawers.storage.element = null
  },
  [mutationTypes.toggleSupplierDrawer](state, payload) {
    state.drawers.supplier.visible = payload.status;
    if (payload.status) state.drawers.supplier.element = payload.element
    else state.drawers.supplier.element = null
  },
  [mutationTypes.toggleUomDrawer](state, payload) {
    state.drawers.uom.visible = payload.status;
    if (payload.status) state.drawers.uom.element = payload.element
    else state.drawers.uom.element = null
  },
};

export const actionTypes = {
  brigadeDrawer: "[ui] brigadeDrawer",
  cashboxDrawer: "[ui] cashboxDrawer",
  documentTemplateDrawer: "[ui] documentTemplateDrawer",
  employeeDrawer: "[ui] employeeDrawer",
  expenseDrawer: "[ui] expenseDrawer",
  legalDrawer: "[ui] legalDrawer",
  officeDrawer: "[ui] officeDrawer",
  statusDrawer: "[ui] statusDrawer",
  storageDrawer: "[ui] storageDrawer",
  supplierDrawer: "[ui] supplierDrawer",
  uomDrawer: "[ui] uomDrawer",
};

const actions = {
  [actionTypes.brigadeDrawer](context, {status, element}) {
    if (status) {
      context.commit(mutationTypes.incrementZIndex);
    } else {
      context.commit(mutationTypes.decrementZIndex);
    }
    return new Promise((resolve) => {
      resolve(
        context.commit(mutationTypes.toggleBrigadeDrawer, { status, element })
      );
    });
  },
  [actionTypes.cashboxDrawer](context, {status, element}) {
    return new Promise((resolve) => {
      if (status) context.commit(mutationTypes.incrementZIndex);
      else context.commit(mutationTypes.decrementZIndex);
      resolve(
        context.commit(mutationTypes.toggleCashboxDrawer, { status, element })
      );
    });
  },
  [actionTypes.documentTemplateDrawer](context, {status, element}) {
    return new Promise((resolve) => {
      if (status) context.commit(mutationTypes.incrementZIndex);
      else context.commit(mutationTypes.decrementZIndex);
      resolve(
        context.commit(mutationTypes.toggleDocumentTemplateDrawer, {
          status,
          element,
        })
      );
    });
  },
  [actionTypes.employeeDrawer](context, {status, element}) {
    return new Promise((resolve) => {
      if (status) context.commit(mutationTypes.incrementZIndex);
      else context.commit(mutationTypes.decrementZIndex);
      resolve(
        context.commit(mutationTypes.toggleEmployeeDrawer, { status, element })
      );
    });
  },
  [actionTypes.expenseDrawer](context, {status, element}) {
    return new Promise((resolve) => {
      if (status) context.commit(mutationTypes.incrementZIndex);
      else context.commit(mutationTypes.decrementZIndex);
      resolve(
        context.commit(mutationTypes.toggleExpenseDrawer, { status, element })
      );
    });
  },
  [actionTypes.legalDrawer](context, {status, element}) {
    return new Promise((resolve) => {
      if (status) context.commit(mutationTypes.incrementZIndex);
      else context.commit(mutationTypes.decrementZIndex);
      resolve(
        context.commit(mutationTypes.toggleLegalDrawer, { status, element })
      );
    });
  },
  [actionTypes.officeDrawer](context, {status, element}) {
    return new Promise((resolve) => {
      if (status) context.commit(mutationTypes.incrementZIndex);
      else context.commit(mutationTypes.decrementZIndex);
      resolve(
        context.commit(mutationTypes.toggleOfficeDrawer, { status, element })
      );
    });
  },
  [actionTypes.statusDrawer](context, {status, element}) {
    return new Promise((resolve) => {
      if (status) context.commit(mutationTypes.incrementZIndex);
      else context.commit(mutationTypes.decrementZIndex);
      resolve(
        context.commit(mutationTypes.toggleStatusDrawer, { status, element })
      );
    });
  },
  [actionTypes.storageDrawer](context, {status, element}) {
    return new Promise((resolve) => {
      if (status) context.commit(mutationTypes.incrementZIndex);
      else context.commit(mutationTypes.decrementZIndex);
      resolve(
        context.commit(mutationTypes.toggleStorageDrawer, { status, element })
      );
    });
  },
  [actionTypes.supplierDrawer](context, {status, element}) {
    return new Promise((resolve) => {
      if (status) context.commit(mutationTypes.incrementZIndex);
      else context.commit(mutationTypes.decrementZIndex);
      resolve(
        context.commit(mutationTypes.toggleSupplierDrawer, { status, element })
      );
    });
  },
  [actionTypes.uomDrawer](context, {status, element}) {
    return new Promise((resolve) => {
      if (status) context.commit(mutationTypes.incrementZIndex);
      else context.commit(mutationTypes.decrementZIndex);
      resolve(
        context.commit(mutationTypes.toggleUomDrawer, { status, element })
      );
    });
  },
};

export default {
  state,
  mutations,
  actions,
};
