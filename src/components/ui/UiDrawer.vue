<template>
  <el-drawer
      v-model="visible"
      :size="size"
      append-to-body
      :direction="direction"
      :custom-class="ownClass"
      :title="title"
      :before-close="beforeCloseHandler"
      :z-index="zIndex"
  >
    <slot/>
  </el-drawer>
</template>

<script>
import {mapState} from "vuex";

export default {
  name: "UiDrawer",
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
      default: '40%'
    },
    ownClass: {
      type: String,
      default: ''
    },
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

<style>

</style>
