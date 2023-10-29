<template>
  <div class="block">
    <h3>Категории</h3>
    <div class="actions">
      <el-button type="default" icon="el-icon-setting"></el-button>
      <el-button type="default" icon="el-icon-plus"></el-button>
    </div>
  </div>
  <el-skeleton
      v-if="loading"
      loading
      animated
      :rows="10"
      class="category_skeleton"
  />
  <el-tree
      v-else
      :data="categories"
      :props="treeParams"
      empty-text="Нет данных для отображения"
      highlight-current
      :indent="12"
      @node-click="handleCategoryClick"
  />
</template>

<script>
import api from '@/api/catalog'

export default {
  emits: ['select'],
  name: "Categories",
  data() {
    return {
      categories: [],
      loading: false,
      treeParams: {
        children: 'children',
        label: 'title',
      }
    }
  },
  computed: {},
  methods: {
    load() {
      this.loading = true
      api.getCategories()
          .then(response => {
            this.categories = response.data.rows
            this.loading = false
          })
          .catch(err => {
            this.loading = false
          })
    },
    handleCategoryClick(el) {
      let ids = [el.id];
      if (el.children.length){
        el.children.forEach(c => {
          ids.push(c.id)
        })
      }
      this.$emit('select', ids)
    }
  },
  mounted() {
    this.load()
  }
}
</script>

<style lang="scss">
.block{
  padding: 0 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  h3{
    font-weight: 700;
    font-size: 16px;
  }
  .actions{
    .el-button{
      padding: 3px;
      line-height: 1;
      height: auto;
      min-height: auto;
      background: transparent;
      border-color: transparent
    }
  }
}
.category_skeleton{
  padding: 10px;
}
</style>
