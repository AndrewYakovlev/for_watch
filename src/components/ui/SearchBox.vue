<template>
  <div class="form_element">
    <el-input v-model="query" placeholder="Быстрый поиск по документам и контактам"/>
  </div>
</template>

<script>
export default {
  name: "SearchBox",
  data(){
    return {
      query: ''
    }
  }
}
</script>

<style>

</style>
