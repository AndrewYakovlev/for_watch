<template>
  <div class="page with_side">
    <div class="side">
      <Categories @select="changeSelectedCategories"/>
    </div>
    <div class="page_content">
      <div class="page_header">
        <h1 class="title">Товары и услуги</h1>
        <el-button type="primary" icon="el-icon-plus">Товар</el-button>
        <el-button type="primary" icon="el-icon-plus">Услуга</el-button>
        <el-button type="primary" icon="el-icon-plus">Комплект</el-button>
        <div class="filters">
          <div class="search">
            <el-input placeholder="Поиск по наименованию, коду или артикулу"></el-input>
          </div>
        </div>
      </div>
      <div class="products_list" v-if="!loading">
        <div class="table" v-if="products.length">
          <table class="table">
            <thead>
            <tr>
              <th></th>
              <th>Артикул</th>
              <th>Код</th>
              <th>Наименование</th>
              <th></th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="product in products" :key="product.id">
              <td></td>
              <td>
                <span class="link">{{ product.sku }}</span>
              </td>
              <td>
                <span class="link">{{ product.code }}</span>
              </td>
              <td>
                <span class="link">{{ product.title }}</span>
              </td>
              <td></td>
            </tr>
            </tbody>
          </table>
        </div>
        <el-empty v-else description='Нет данных для отображения'></el-empty>
      </div>
      <el-skeleton
          v-else
          :rows='10'
          animated
          loading
      ></el-skeleton>
      <div id="paginator">
        <el-pagination
            background
            hide-on-single-page
            layout="slot, prev, pager, next"
            :total="total"
            :page-size="filters.limit"
            @current-change="changePage"
        >
          <span class="total">Всего: {{ total }}</span>
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import api from "@/api/catalog";
import Categories from "@/components/catalog/Categories";
import {config} from "@/objects/default.config";

export default {
  name: "Catalog",
  components: {Categories},
  data(){
    return {
      products: [],
      total: 0,
      loading: false,
      filters: {
        limit: config.filters.limit,
        offset: 0,
        categories: []
      }
    }
  },
  computed: {
    currentPage() {
      return this.filters.offset / this.filters.limit + 1
    },
    totalPages() {
      return Math.ceil(this.total / this.filters.limit);
    }
  },
  methods: {
    load() {
      this.loading = true
      api.getProducts(this.filters).then(response => {
        this.products = response.data.rows
        this.total = response.data.total
        this.loading = false
      }).catch(error => {

      })
    },
    changePage(page) {
      this.filters.offset = (page - 1) * this.filters.limit
      this.load()
    },
    changeSelectedCategories(cats){
      this.filters.categories = cats
      this.load()
    }
  },
  mounted() {
    this.load()
  },
}
</script>

<style scoped>

</style>
