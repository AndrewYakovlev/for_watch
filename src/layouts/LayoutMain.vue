<template>
  <ui-header/>
  <ui-side-bar/>
  <div class="content">
    <router-view/>
  </div>

  <div class="drawers">

    <brigade-drawer v-if="d.brigade.visible" :visible="d.brigade.visible"/>
    <cashbox-drawer v-if="d.cashbox.visible" :visible="d.cashbox.visible"/>
    <document-template-drawer v-if="d.documentTemplate.visible" :visible="d.documentTemplate.visible"/>
    <employee-drawer v-if="d.employee.visible" :visible="d.employee.visible"/>
    <expense-drawer v-if="d.expense.visible" :visible="d.expense.visible"/>
    <legal-drawer v-if="d.legal.visible" :visible="d.legal.visible"/>
    <office-drawer v-if="d.office.visible" :visible="d.office.visible"/>
    <status-drawer v-if="d.status.visible" :visible="d.status.visible"/>
    <storage-drawer v-if="d.storage.visible" :visible="d.storage.visible"/>
    <supplier-drawer v-if="d.supplier.visible" :visible="d.supplier.visible"/>
    <uom-drawer v-if="d.uom.visible" :visible="d.uom.visible"/>

  </div>

</template>

<script>
import UiHeader from "@/components/ui/UiHeader";
import UiSideBar from "@/components/ui/UiSideBar";
import {mapState} from "vuex";

import {actionTypes as employeeActions} from "@/store/modules/employees";
import {actionTypes as brigadeActions} from "@/store/modules/brigades";
import {actionTypes as documentTemplatesActions} from "@/store/modules/documentTemplates";
import {actionTypes as supplierActions} from "@/store/modules/suppliers";
import {actionTypes as cashboxActions} from "@/store/modules/cashboxes";
import {actionTypes as storageActions} from "@/store/modules/storages";
import {actionTypes as statusActions} from "@/store/modules/statuses";
import {actionTypes as expenseActions} from "@/store/modules/expenses";
import {actionTypes as officeActions} from "@/store/modules/offices";
import {actionTypes as legalActions} from "@/store/modules/legals";
import {actionTypes as uomActions} from "@/store/modules/uoms";
import OfficeDrawer from "@/components/settings/OfficeDrawer";
import BrigadeDrawer from "@/components/settings/BrigadeDrawer";
import CashboxDrawer from "@/components/settings/CashboxDrawer";
import DocumentTemplateDrawer from "@/components/settings/DocumentTemplateDrawer";
import EmployeeDrawer from "@/components/settings/EmployeeDrawer";
import ExpenseDrawer from "@/components/settings/ExpenseDrawer";
import LegalDrawer from "@/components/settings/LegalDrawer";
import StatusDrawer from "@/components/settings/StatusDrawer";
import StorageDrawer from "@/components/settings/StorageDrawer";
import SupplierDrawer from "@/components/settings/SupplierDrawer";
import UomDrawer from "@/components/catalog/UomDrawer";

export default {
  name: "LayoutMain",
  components: {
    UomDrawer,
    SupplierDrawer,
    StorageDrawer,
    StatusDrawer,
    LegalDrawer,
    ExpenseDrawer,
    EmployeeDrawer, DocumentTemplateDrawer, CashboxDrawer, BrigadeDrawer, OfficeDrawer, UiSideBar, UiHeader
  },
  data() {
    return {
      polling: {
        references: null,
      },
    }
  },
  computed: {
    ...mapState({
      user: state => state.auth.user,
      d: state => state.ui.drawers
    })
  },
  methods: {
    startup() {
      this.$store.dispatch(employeeActions.load)
      this.$store.dispatch(brigadeActions.load)
      this.$store.dispatch(documentTemplatesActions.load)
      this.$store.dispatch(supplierActions.load)
      this.$store.dispatch(cashboxActions.load)
      this.$store.dispatch(storageActions.load)
      this.$store.dispatch(statusActions.load)
      this.$store.dispatch(expenseActions.load)
      this.$store.dispatch(officeActions.load)
      this.$store.dispatch(legalActions.load)
      this.$store.dispatch(uomActions.load)
      this.silentUpdate()
    },
    silentUpdate() {
      this.polling.references = setInterval(() => {
        this.$store.dispatch(employeeActions.silentUpdate)
        this.$store.dispatch(brigadeActions.silentUpdate)
        this.$store.dispatch(documentTemplatesActions.silentUpdate)
        this.$store.dispatch(supplierActions.silentUpdate)
        this.$store.dispatch(cashboxActions.silentUpdate)
        this.$store.dispatch(storageActions.silentUpdate)
        this.$store.dispatch(statusActions.silentUpdate)
        this.$store.dispatch(expenseActions.silentUpdate)
        this.$store.dispatch(officeActions.silentUpdate)
        this.$store.dispatch(legalActions.silentUpdate)
        this.$store.dispatch(uomActions.silentUpdate)
      }, 600000);
    }
  },
  created() {
    this.startup()
  },
  beforeUnmount() {
    clearInterval(this.polling.references)
  }
}
</script>

<style lang="scss">
@import '../styles/general';
</style>
