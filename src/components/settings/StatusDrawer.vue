<template>
  <ui-drawer
      title="Статус"
      :visible="visible"
      @closed="closed"
      ownClass="settings_drawer drawer__status"
  >
    {{element}}
  </ui-drawer>
</template>

<script>
import UiDrawer from "@/components/ui/UiDrawer";
import {actionTypes as ui} from "@/store/modules/ui";
import {mapState} from "vuex";

export default {
  name: "StatusDrawer",
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
      element: state => state.ui.drawers.status.element
    })
  },
  methods: {
    closed() {
      this.$store.dispatch(ui.statusDrawer, {status: false, element: null})
    }
  }
}
</script>
