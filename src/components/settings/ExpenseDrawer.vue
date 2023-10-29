<template>
  <ui-drawer
      title="Статья расходов"
      :visible="visible"
      @closed="closed"
      ownClass="settings_drawer drawer__expense"
  >
    {{element}}
  </ui-drawer>
</template>

<script>
import UiDrawer from "@/components/ui/UiDrawer";
import {actionTypes as ui} from "@/store/modules/ui";
import {mapState} from "vuex";

export default {
  name: "ExpenseDrawer",
  components: {UiDrawer},
  props: {
    visible: {
      type: Boolean,
      default: false
    },
  },
  data() {
    return {
      show: false
    }
  },
  computed: {
    ...mapState({
      element: state => state.ui.drawers.expense.element
    })
  },
  methods: {
    closed() {
      this.$store.dispatch(ui.expenseDrawer, {status: false, element: null})
    }
  }
}
</script>
