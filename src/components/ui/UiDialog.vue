<template>
    <el-dialog
    v-model="visible"
    :title="title"
    :width="size"
    :before-close="beforeCloseHandler"
    :fullscreen="fullscreen"
    append-to-body
    >
      <slot/>
    </el-dialog>
</template>

<script>
import {mapState} from "vuex";
export default {
  name: "UiDialog",
  props: {
    visible: {
      type: Boolean,
      default: false,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    direction: {
      type: String,
      default: 'rtl'
    },
    size: {
      type: String,
      default: '400px'
    },
    ownClass: {
      type: String,
      default: ''
    },
    fullscreen: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapState({
      zIndex: state => state.ui.zIndex
    })
  },
  methods: {
    beforeCloseHandler(done) {
      done()
    },
  },
}
</script>

<style scoped>

</style>
