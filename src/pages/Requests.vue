<template>
  <div class="page">
    <div class="page_header">
      <h1 class="title">Обращения</h1>
      <el-button type="primary">+ Обращение</el-button>
    </div>
    <div class="page_content" v-if="!loading">
      <div class="table" v-if="requests.length">
        <table class="table">
          <thead>
          <tr>
            <th>#</th>
            <th>Дата и время</th>
            <th>Клиент</th>
            <th>Контакты</th>
            <th>Документы</th>
            <th>Статус</th>
            <th>Ответственные</th>
            <th></th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="r in requests" :key="r.id">
            <td>
              <span class="link">{{ r.number }}</span>
            </td>
            <td style="width: 90px">{{ moment(r.createdAt).format('DD.MM.YY HH:mm') }}</td>
            <td>
              <span class="link">{{r.person.name}}</span>
            </td>
            <td>
              <template v-if="r.person.contacts">
                <template v-for="c in r.person.contacts" :key="c.id">
                  <a :href="`tel:+7${c.value}`" class="link" v-if="c.type==='phone'">{{ c.formatted }}</a>
                  <a :href="`mailto:${c.value}`" class="link" v-else-if="c.type==='email'">{{ c.formatted }}</a>
                </template>
              </template>
            </td>
            <td>
              <template v-if="r.calculations.length">
                <el-tag
                    v-for="c in r.calculations"
                    :key="c.id"
                >
                  Расчет {{c.number}} от {{moment(c.createdAt).format('DD.MM.YY')}} на {{c.sum_wd}}
                </el-tag>
              </template>
              <template v-if="r.orders.length">
                <el-tag
                    v-for="o in r.orders"
                    :key="o.id"
                    :style="{
                      backgroundColor: o?.status?.bg ? o.status.bg : null,
                      borderColor: o?.status?.bg ? o.status.bg : null,
                      color: o?.status?.color ? o.status.color : null,
                    }"
                >
                  Заказ {{o.number}} от {{moment(o.createdAt).format('DD.MM.YY')}} на {{o.sum_wd}}
                </el-tag>
              </template>
              <template v-if="r.payments.length">
                <el-tag
                    v-for="p in r.payments"
                    :key="p.id"
                    type="success"
                    effect="plain"
                >
                  Платеж на {{p.sum}} от {{moment(p.createdAt).format('DD.MM.YY')}}
                </el-tag>
              </template>

            </td>
            <td>
              <el-tag type="primary" :style="{
                backgroundColor: r.status.bg ? r.status.bg : null,
                borderColor: r.status.bg ? r.status.bg : null,
                color: r.status.color ? r.status.color : null,
                boxShadow: '0 0 3px 0 rgba(50,50,50,0.1)'
              }">{{r.status.title}}</el-tag>
            </td>
            <td style="width: 100px"><span class="link">{{ r.employee?.fio_short }}</span></td>
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
import api from "@/api/requests";
import {config} from "@/objects/default.config";

export default {
  name: "Requests",
  data() {
    return {
      requests: [],
      total: 0,
      loading: false,
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
        this.requests = response.data.rows
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
  }
}
</script>
