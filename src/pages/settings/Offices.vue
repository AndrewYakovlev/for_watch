<template>
  <div class="setting_page">
    <div class="page_header">
      <h1 class="title">Офисы</h1>
      <el-button type="primary" @click="create" icon="el-icon-plus">Офис</el-button>
    </div>
    <div class="page_content" v-if="!loading">
      <div class="table" v-if="rows.length">
        <table class='table'>
          <thead>
          <tr>
            <th>#</th>
            <th>Офис</th>
            <th>Адрес</th>
            <th>Сотрудники</th>
            <th></th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(el, idx) in rows" :key="el.id">
            <td>{{ ++idx }}</td>
            <td>
              <span class="link" @click="edit(el)">{{ el.title }}</span>
            </td>
            <td>{{ el.address?.value }}</td>
            <td>
              <template v-if="el.employees.length">
                <el-tag v-for="emp in el.employees" type="info" effect="plain">{{ emp.fio_short }}</el-tag>
              </template>
            </td>
            <td>
              <el-button type="default" plain icon="el-icon-edit" @click='edit(el)'></el-button>
              <el-popconfirm
                  confirm-button-text="Да, удалить"
                  cancel-button-text="Нет, не нужно"
                  icon="el-icon-info"
                  icon-color="red"
                  title="Вы уверены, что хотите удалить офис?"
                  @confirm="remove(el)"
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
import officeEntity from '@/objects/entities/office.entity';
import _ from "lodash";
import {actionTypes as officeActions} from "@/store/modules/offices";
import {ElNotification} from "element-plus";

export default {
  name: "Offices",
  data() {
    return {}
  },
  computed: {
    ...mapState({
      rows: state => state.offices.rows,
      loading: state => state.offices.loading,
    })
  },
  methods: {
    create() {
      this.$store.dispatch(ui.officeDrawer, {status: true, element: _.cloneDeep(officeEntity.empty)})
    },
    edit(element) {
      this.$store.dispatch(ui.officeDrawer, {status: true, element: _.cloneDeep(element)})
    },
    remove(el) {
      this.$store.dispatch(officeActions.remove, el.id).then(response => {
        this.$store.dispatch(officeActions.load)
      }).catch(err => {
        ElNotification({
          title: 'Ошибка',
          message: err.response.data.message,
          type: 'error'
        })
      })
    }
  }
}
</script>

<style>

</style>
