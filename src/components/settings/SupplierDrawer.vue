<template>
  <ui-drawer
      title="Поставщик"
      :visible="visible"
      @closed="closed"
      ownClass="settings_drawer drawer__supplier"
  >
    {{ element }}
  </ui-drawer>
</template>

<script>
import UiDrawer from "@/components/ui/UiDrawer";
import {actionTypes as ui} from "@/store/modules/ui";
import {mapState} from "vuex";

export default {
  name: "SupplierDrawer",
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
      element: state => state.ui.drawers.supplier.element
    })
  },
  methods: {
    closed() {
      this.$store.dispatch(ui.supplierDrawer, {status: false, element: null})
    }
  }
}
</script>
