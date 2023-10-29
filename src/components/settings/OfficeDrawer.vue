<template>
  <ui-drawer
      title="Юридическое лицо"
      :visible="visible"
      size="30%"
      @closed="closed"
      ownClass="settings_drawer drawer__legal"
  >
    <el-form ref="form" :model="element" label-position="top">
      <el-form-item label="Название офиса">
        <el-input v-model="element.title" placeholder="Название офиса"/>
      </el-form-item>
      <form-address @select="setAddress" :object="element.address"/>
      <el-form-item label="Комментарий">
        <el-input type="textarea" v-model="element.comment" placeholder="Комментарий"/>
      </el-form-item>
      <div class="actions">
        <el-button type="primary" @click="submit" :loading="submitting">
          <template v-if="element.id">Сохранить</template>
          <template v-else>Добавить</template>
        </el-button>
        <el-button type="default" @click="close">Отменить</el-button>
      </div>
    </el-form>
  </ui-drawer>
</template>

<script>
import UiDrawer from "@/components/ui/UiDrawer";
import {actionTypes as ui} from "@/store/modules/ui";
import {mapState} from "vuex";
import FormAddress from "@/components/form/FormAddress";
import {actionTypes as officeActions} from "@/store/modules/offices";

export default {
  name: "OfficeDrawer",
  components: {FormAddress, UiDrawer},
  props: {
    visible: {
      type: Boolean,
      default: false
    },
  },
  computed: {
    ...mapState({
      element: state => state.ui.drawers.office.element,
      zIndex: state => state.ui.zIndex,
      submitting: state => state.offices.submitting
    })
  },
  methods: {
    close() {
      this.closed()
    },

    closed() {
      this.$store.dispatch(ui.officeDrawer, {status: false})
    },
    setAddress(address) {
      this.element.address = address
    },
    submit() {
      this.$store.dispatch(officeActions.save, this.element).then(() => {
        this.$store.dispatch(officeActions.load).then(() => {
          this.$store.dispatch(ui.officeDrawer, {status: false})
        })
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>
