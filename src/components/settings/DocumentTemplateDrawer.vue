<template>
  <ui-drawer
      title="Шаблон документа"
      :visible="visible"
      @closed="closed"
      ownClass="settings_drawer drawer__doc_template"
  >
    {{ element }}
  </ui-drawer>
</template>

<script>
import UiDrawer from "@/components/ui/UiDrawer";
import {actionTypes as ui} from "@/store/modules/ui";
import {mapState} from "vuex";

export default {
  name: "DocumentTemplateDrawer",
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
      element: state => state.ui.drawers.documentTemplate.element
    })
  },
  methods: {
    closed() {
      this.$store.dispatch(ui.documentTemplateDrawer, {status: false, element: null})
    }
  }
}
</script>
