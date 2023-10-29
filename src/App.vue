<template>
  <component :is="layout"></component>
</template>

<script>

import LayoutAuth from "@/layouts/LayoutAuth";
import LayoutMain from "@/layouts/LayoutMain";
import LayoutError from "@/layouts/LayoutError";
export default {
  name: 'App',
  components: {LayoutAuth,LayoutMain, LayoutError},
  computed: {
    layout(){
      return this.$route.meta.layout ? 'layout-'+this.$route.meta.layout : 'layout-auth'
    }
  }
}
</script>

<style lang="scss">

</style>
