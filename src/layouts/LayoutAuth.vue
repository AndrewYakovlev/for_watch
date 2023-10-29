<template>
  <div class="wrapper auth-layout">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: "LayoutAuth"
}
</script>

<style lang="scss">
    .wrapper{
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      width: 100%;
      min-height: 100vh;
      display: flex;
      background: #ddd;
    }
</style>
