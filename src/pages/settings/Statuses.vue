<template>
  <div class="setting_page">
    <div class="page_header">
      <h1 class="title">Статусы {{ title }}</h1>
      <el-button type="primary" @click="create" icon="el-icon-plus">Статус</el-button>
    </div>
    <div class="page_content" v-if="!loading">
      <div class="table" v-if="rows.length">
        <table class='table'>
          <thead>
          <tr>
            <th>#</th>
            <th>Внутренний статус</th>
            <th>Статус для клиента</th>
            <th></th>
            <th></th>
            <th></th>

          </tr>
          </thead>
          <tbody>
          <tr v-for="(el, idx) in statuses" :key="el.id">
            <td>{{ ++idx }}</td>
            <td>
              <el-tag
                  @click="edit(el)"
                  effect="dark"
                  :style="{backgroundColor: el.bg, borderColor: el.bg,color: el.color}"
              >{{ el.title }}
              </el-tag>
            </td>
            <td>
              <el-tag
                  @click="edit(el)"
                  effect="dark"
                  :style="{backgroundColor: el.clientBg, borderColor: el.clientBg,color: el.clientColor}"
              >{{ el.clientTitle ? el.clientTitle : el.title }}
              </el-tag>
            </td>
            <td>
              <el-tag type="primary" effect="plain" v-if="el.start">Начальный</el-tag>
              <el-tag type="success" effect="dark" v-else-if="el.finish && el.success">Финальный, успешный</el-tag>
              <el-tag type="danger" effect="dark" v-else-if="el.finish && !el.success">Финальный, неудачный</el-tag>
            </td>
            <td>
              <el-button type="default" plain icon="el-icon-edit" @click='edit(el)'></el-button>
              <el-popconfirm
                  confirm-button-text="Да, удалить"
                  cancel-button-text="Нет, не нужно"
                  icon="el-icon-info"
                  icon-color="red"
                  title="Вы уверены, что хотите удалить офис?"
              >
                <template #reference>
                  <el-button type="danger" icon="el-icon-delete"></el-button>
                </template>
              </el-popconfirm>
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
  </div>
</template>

<script>
import {mapState} from "vuex";
import {actionTypes as ui} from "@/store/modules/ui";
import statusEntity from "@/objects/entities/status.entity";

export default {
  name: "Statuses",
  computed: {
    ...mapState({
      rows: state => state.statuses.rows,
      loading: state => state.statuses.loading
    }),
    statuses() {
      return this.rows.filter(status => status.type === this.$route.params.type)
    },
    title() {
      if (this.$route.params.type === 'request') return 'обращений'
      if (this.$route.params.type === 'order') return 'заказов'
      if (this.$route.params.type === 'purchase') return 'закупок'
      return ''
    }
  },
  methods: {
    create() {
      this.$store.dispatch(ui.statusDrawer, {status: true, element: statusEntity.empty})
    },
    edit(element) {
      this.$store.dispatch(ui.statusDrawer, {status: true, element})
    }
    }
  }
</script>

<style>

</style>
