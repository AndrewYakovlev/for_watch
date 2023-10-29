<template>
  <ui-drawer
      title="Юридическое лицо"
      :visible="visible"
      @closed="closed"
      ownClass="settings_drawer drawer__legal"
  >
    {{element}}
  </ui-drawer>
</template>

<script>
import UiDrawer from "@/components/ui/UiDrawer";
import {actionTypes as ui} from "@/store/modules/ui";
import {mapState} from "vuex";

export default {
  name: "LegalDrawer",
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
      element: state => state.ui.drawers.legal.element
    })
  },
  methods: {
    closed(){
      this.$store.dispatch(ui.legalDrawer, {status: false, element: null})
    }
  }
}
</script>
