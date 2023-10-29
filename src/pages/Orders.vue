<template>
  <div class="page">
    <div class="page_header">
      <h1 class="title">Заказы</h1>
      <el-button type="primary">+ Заказ</el-button>
    </div>
    <div class="page_content" v-if="!loading">
      <div class="table" v-if="orders.length">
        <table class="table">
          <thead>
          <tr>
            <th>#</th>
            <th>Дата и время</th>
            <th>Клиент</th>
            <th>Сотрудник</th>
            <th></th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="o in orders" :key="o.id">
            <td>
              <span class="link">{{ o.number }}</span>
            </td>
            <td style="width: 90px">{{ moment(o.createdAt).format('DD.MM.YY HH:mm') }}</td>
            <td>
              <span class="link">{{o.person.name}}</span>
            </td>
            <td>

            </td>
            <td>{{ o.sum }}</td>
            <td>


            </td>
            <td>

            </td>
            <td style="width: 100px"><span class="link">{{ o.employee.fio_short }}</span></td>
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
import api from '@/api/orders'
import {config} from '@/objects/default.config'

export default {
  name: "Orders",
  data() {
    return {
      orders: [],
      loading: false,
      total: 0,
      filters: {
        limit: config.filters.limit,
        offset: 0,
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
        this.orders = response.data.rows
        this.total = response.data.total
        this.loading = false
      }).catch(err => {
      })
    },
    changePage(page) {
      this.filters.offset = (page - 1) * this.filters.limit
      this.load()
    }
  },
  mounted() {
    this.load()
  }
}
</script>

<style scoped>

</style>
