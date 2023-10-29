<template>
  <div class="page">
    <div class="page_header">
      <h1 class="title">Платежи</h1>
      <el-button type="primary">+ Входящий</el-button>
      <el-button type="primary">+ Исходящий</el-button>
    </div>
    <div class="page_content" v-if="!loading">
      <div class="table" v-if="payments.length">
        <table class="table">
          <thead>
          <tr>
            <th>#</th>
            <th>Дата и время</th>
            <th>Клиент</th>
            <th>Документы</th>
            <th>Сумма</th>
            <th>Офис, касса</th>
            <th>Назначение</th>
            <th>Сотрудник</th>
            <th></th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="pay in payments" :key="pay.id">
            <td>
              <span class="link">{{ pay.number }}</span>
            </td>
            <td style="width: 90px">{{ moment(pay.createdAt).format('DD.MM.YY HH:mm') }}</td>
            <td>
              <span class="company" v-if="pay.personCompany">
                 <span class="link">{{ pay.personCompany?.title }}</span>
                <template v-if="pay.person">(<span class="link">{{ pay.person.name }}</span>)</template>
              </span>
              <template v-else>
                <span class="link">{{ pay.person.name }}</span>
              </template>
            </td>
            <td>
              <el-tag
                  type="success"
                  v-if="pay.order"
                  :style="{
                    backgroundColor: pay.order.status.bg,
                    borderColor: pay.order.status.bg,
                    color: pay.order.status.color
                    }"
              >Заказ #{{ pay.order.number }} - {{ pay.order.sum_wd }}р
              </el-tag>
              <template v-else>
                <el-tag
                    type="success"
                    v-if="pay.request"
                    :style="{
                    backgroundColor: pay.request.status.bg,
                    borderColor: pay.request.status.bg,
                    color: pay.request.status.color
                    }"
                >Обращение #{{ pay.request.number }}
                </el-tag>
                <el-tag
                    type="info"
                    v-if="pay.calculation"
                    effect="plain"
                >Расчет #{{ pay.calculation.number }}
                </el-tag>
              </template>
            </td>
            <td>{{ pay.sum }}</td>
            <td>
              <el-tag v-if="pay.cashbox" type="info" effect="plain">{{ pay.cashbox.title }}</el-tag>
              <el-tag v-if="pay.office" type="info" effect="plain">{{ pay.office.title }}</el-tag>

            </td>
            <td>
              {{ pay.purpose }}
              <template v-if="pay.comment"> / {{ pay.comment }}</template>
            </td>
            <td style="width: 100px"><span class="link">{{ pay.employee.fio_short }}</span></td>
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
import api from '@/api/payments'
import {config} from '@/objects/default.config'

export default {
  name: "Payments",
  data() {
    return {
      payments: [],
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
        this.payments = response.data.rows
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
