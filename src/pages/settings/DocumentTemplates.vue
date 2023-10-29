<template>
  <div class="setting_page">
    <div class="page_header">
      <h1 class="title">Шаблоны документов</h1>
      <el-button type="primary" @click="create" icon="el-icon-plus">Шаблон</el-button>
    </div>
    <div class="page_content" v-if="!loading">
      <div class="table" v-if="rows.length">
        <table class='table'>
          <thead>
          <tr>
            <th>#</th>
            <th>Наименование</th>
            <th>Файл шаблона</th>
            <th>Назначение</th>
            <th></th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(el, idx) in rows" :key="el.id">
            <td>{{ ++idx }}</td>
            <td>
              <span class="link" @click="edit(el)">{{ el.title }}</span>
            </td>
            <td>
              <a :href="el.file" class="link" target="_blank">Скачать</a>
            </td>
            <td>
              <el-tag type="success" effect="dark" v-if="el.for_orders">Заказы</el-tag>
              <el-tag type="info" effect="dark" v-if="el.for_calculations">Расчеты</el-tag>
              <el-tag type="primary" effect="dark" v-if="el.for_payments">Платежи</el-tag>
              <el-tag type="warning" effect="dark" v-if="el.for_acts">Сопроводительные</el-tag>
            </td>
            <td>
              <el-button type="default" plain icon="el-icon-edit" @click='edit(el)'></el-button>
              <el-popconfirm
                  confirm-button-text="Да, удалить"
                  cancel-button-text="Нет, не нужно"
                  icon="el-icon-info"
                  icon-color="red"
                  title="Вы уверены, что хотите удалить шаблон?"
              >
                <template #reference>
                  <el-button type="danger" plain icon="el-icon-delete"></el-button>
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
import documentTemplateEntity from '@/objects/entities/document-template.entity'

export default {
  name: "DocumentTemplates",
  data() {
    return {}
  },
  computed: {
    ...mapState({
      rows: state => state.documentTemplates.rows,
      loading: state => state.documentTemplates.loading
    })
  },
  methods: {
    create() {
      this.$store.dispatch(ui.documentTemplateDrawer, {status: true, element: documentTemplateEntity.empty})
    },
    edit(element) {
      this.$store.dispatch(ui.documentTemplateDrawer, {status: true, element})
    }
  }
}
</script>

<style>

</style>
