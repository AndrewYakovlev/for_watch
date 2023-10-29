<template>
  <ui-drawer
      title="Еденица измерения"
      :visible="visible"
      @closed="closed"
      ownClass="settings_drawer drawer__uom"
  >
    <h1>Форма офиса</h1>
  </ui-drawer>
</template>

<script>
import UiDrawer from "@/components/ui/UiDrawer";
import {actionTypes as ui} from "@/store/modules/ui";

export default {
  name: "uomDrawer",
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
  methods: {
    closed() {
      this.$store.dispatch(ui.uomDrawer, false)
    }
  }
}
</script>
