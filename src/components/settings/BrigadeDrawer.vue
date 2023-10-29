<template>
  <ui-drawer
      title="Бригада"
      :visible="visible"
      @closed="closed"
      ownClass="settings_drawer drawer__brigade"
  >
    {{element}}
  </ui-drawer>
</template>

<script>
import UiDrawer from "@/components/ui/UiDrawer";
import {actionTypes as ui} from "@/store/modules/ui";
import {mapState} from "vuex";

export default {
  name: "BrigadeDrawer",
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
      element: state => state.ui.drawers.brigade.element
    })
  },
  methods: {
    closed(){
      this.$store.dispatch(ui.brigadeDrawer, {status: false, element: null})
    }
  }
}
</script>
