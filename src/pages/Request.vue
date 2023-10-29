<template>
  <div class="page">
    <div class="page_header">
      <h1 class="title">Обращение</h1>
    </div>
  </div>
</template>

<script>
export default {
  name: "Request",
  computed: {
    id(){
      return this.$route.params.id
    }
  },
}
</script>

<style scoped>

</style>
