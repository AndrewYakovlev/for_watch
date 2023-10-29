<template>
  <ui-drawer
      title="Касса"
      :visible="visible"
      @closed="closed"
      ownClass="settings_drawer drawer__cashbox"
  >
    {{element}}
  </ui-drawer>
</template>

<script>
import UiDrawer from "@/components/ui/UiDrawer";
import {actionTypes as ui} from "@/store/modules/ui";
import {mapState} from "vuex";

export default {
  name: "CashboxDrawer",
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
      element: state => state.ui.drawers.cashbox.element
    })
  },
  methods: {
    closed(){
      this.$store.dispatch(ui.cashboxDrawer, {status: false, element: null})
    }
  }
}
</script>
