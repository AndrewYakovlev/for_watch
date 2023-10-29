<template>
  <div class="setting_page">
    <div class="page_header">
      <h1 class="title">Сотрудники</h1>
      <el-button type="primary" @click="create" icon="el-icon-plus">Сотрудник</el-button>
    </div>
    <div class="page_content" v-if="!loading">
      <div class="table" v-if="rows.length">
        <table class='table'>
          <thead>
          <tr>
            <th>#</th>
            <th>Ф.И.О.</th>
            <th>Номер телефона</th>
            <th>Должность</th>
            <th>Офис</th>
            <th>Последняя активность</th>
            <th></th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(el, idx) in rows" :key="el.id">
            <td>{{ ++idx }}</td>
            <td>
              <span class="link" @click="edit(el)">{{ el.fio_full }}</span>
            </td>
            <td>{{ formatPhone(el.user.phone) }}</td>
            <td>{{ getRole(el.user.role) }}</td>
            <td>
              <el-tag effect="plain" type="info" v-if="el.office">{{ el.office.title }}</el-tag>
            </td>
            <td>
              <span class="time" v-if="el.user.lastActivity">{{ moment(el.user.lastActivity).calendar() }}</span>
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
import {actionTypes} from "@/store/modules/employees";
import {formatPhone} from "@/helpers/phone.helper";
import {getRole} from "@/helpers/role.helper";
import {actionTypes as ui} from "@/store/modules/ui"
import employeeEntity from "@/objects/entities/employee.entity";
import _ from "lodash";

export default {
  name: "Employees",
  data() {
    return {}
  },
  computed: {
    ...mapState({
      rows: state => state.employees.rows,
      loading: state => state.employees.loading,
    })
  },
  methods: {
    load() {
      this.$store.dispatch(actionTypes.load)
    },
    formatPhone,
    getRole,
    create() {
      this.$store.dispatch(ui.employeeDrawer, {status: true, element: _.cloneDeep(employeeEntity.empty)})
    },
    edit(element) {
      this.$store.dispatch(ui.employeeDrawer, {status: true, element: _.cloneDeep(element)})
    }
  },
  mounted() {

  }
}
</script>

<style>

</style>
