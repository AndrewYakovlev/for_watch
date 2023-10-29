<template>
  <div class="page">
    <div class="page_header">
      <h1 class="title">Контакты</h1>
      <el-button type="primary">+ Контакт</el-button>
      <el-button type="primary">+ Компания</el-button>
    </div>
    <div class="page_content" v-if="!loading">
      <div class="table" v-if="persons.length">
        <table class="table">
          <thead>
          <tr>
            <th></th>
            <th>Клиент</th>
            <th>Компании</th>
            <th>Контакты</th>
            <th>Адреса</th>
            <th>Документы</th>
            <th>Заметки</th>
            <th>Ответственный</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="contact in persons" :key="contact.id">
            <td>

            </td>
            <td>
              <span class="link">{{ contact.name }}</span>
            </td>
            <td>
              <template v-if="contact.companies.length">
                <el-tag type="info" effect="plain" v-for="c in contact.companies">
                  {{ c.title }}
                </el-tag>
              </template>
            </td>
            <td>
              <template v-if="contact.contacts">
                <template v-for="c in contact.contacts" :key="c.id">
                  <a :href="`tel:+7${c.value}`" class="link" v-if="c.type==='phone'">{{ c.formatted }}</a>
                  <a :href="`mailto:${c.value}`" class="link" v-else-if="c.type==='email'">{{ c.formatted }}</a>
                </template>
              </template>
            </td>
            <td>
              <template v-if="contact.addresses.length">
                <span class="address" v-for="a in contact.addresses">
                  {{ a.value }}
                </span>
              </template>
            </td>
            <td>
              <template v-if="contact.requests.length">
                <el-tag
                    v-for="r in contact.requests"
                    :key="r.id"
                    :style="{
                      backgroundColor: r?.status.bg ? r.status.bg : null,
                      borderColor: r?.status.bg ? r.status.bg : null,
                      color: r?.status.color ? r.status.color : null
                    }"
                >
                  Обращение от {{moment(r.createdAt).format('DD.MM.YY')}}
                </el-tag>
              </template>
              <template v-if="contact.orders.length">
                <el-tag
                    v-for="o in contact.orders"
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
              <template v-if="contact.payments.length">
                <el-tag
                    v-for="p in contact.payments"
                    :key="p.id"
                    type="success"
                    effect="plain"
                >
                  Платеж на {{p.sum}} от {{moment(p.createdAt).format('DD.MM.YY')}}
                </el-tag>
              </template>
            </td>
            <td>{{ contact.comment }}</td>
            <td>
              <span class="link">{{ contact.owner?.fio_short }}</span>
            </td>
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
import api from "@/api/contacts";
import {config} from "@/objects/default.config";

export default {
  name: "Contacts",
  data() {
    return {
      persons: [],
      total: 0,
      loading: false,
      filters: {
        limit: config.filters.limit,
        offset: 0,
        query: ''
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
        this.persons = response.data.rows
        this.total = response.data.total
        this.loading = false
      }).catch(error => {

      })
    },
    changePage(page) {
      this.filters.offset = (page - 1) * this.filters.limit
      this.load()
    },
  },
  mounted() {
    this.load()
  }
}
</script>

<style scoped>

</style>
