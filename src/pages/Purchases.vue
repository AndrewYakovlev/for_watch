<template>
  <div class="page">
    <div class="page_header">
      <h1 class="title">Закупки</h1>
      <el-button type="primary">+ Накладная</el-button>
      <el-button type="primary">+ Заказ поставщику</el-button>
    </div>
    <div class="page_content" v-if="!loading">
      <div class="table" v-if="purchases.length">
        <table class="table">
          <thead>
          <tr>
            <th>#</th>
            <th>Дата и время</th>
            <th></th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="pur in purchases" :key="pur.id">
            <td>
              <span class="link">{{ pur.number }}</span>
            </td>
            <td style="width: 90px">{{ moment(pur.createdAt).format('DD.MM.YY HH:mm') }}</td>
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
</template>

<script>
import api from "@/api/purchases"
import {config} from '@/objects/default.config'

export default {
  name: "Purchases",
  data() {
    return {
      purchases: [],
      total: 0,
      loading: false,
      filters: {
        limit: config.filters.limit,
        offset: 0,
        type: null,
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
      api.get(this.filters).then(response => {
        this.purchases = response.data.rows
        this.total = response.data.total
        this.loading = false
      }).catch(error => {

      })
    },
    changePage(page) {
      this.filters.offset = (page - 1) * this.filters.limit
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
