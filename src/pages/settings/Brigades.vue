<template>
  <div class="setting_page">
    <div class="page_header">
      <h1 class="title">Бригады</h1>
      <el-button type="primary" @click="create" icon="el-icon-plus">Бригада</el-button>
    </div>
    <div class="page_content" v-if="!loading">
      <div class="table" v-if="rows.length">
        <table class='table'>
          <thead>
          <tr>
            <th>#</th>
            <th>Бригада</th>
            <th>Руководитель</th>
            <th>Состав</th>
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
              <el-tag effect="plain" v-if="el.leader">{{ el.leader.fio_short }}</el-tag>
            </td>
            <td>
              <template v-if="el.installers.length">
                <el-tag effect="plain" type="info" v-for="ins in el.installers">{{ ins.fio_short }}</el-tag>
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
import brigadeEntity from "@/objects/entities/brigade.entity";

export default {
  name: "Brigades",
  data() {
    return {}
  },
  computed: {
    ...mapState({
      rows: state => state.brigades.rows,
      loading: state => state.brigades.loading
    })
  },
  methods: {
    create(){
      this.$store.dispatch(ui.brigadeDrawer, {status: true, element: brigadeEntity.empty})
    },
    edit(element){
      this.$store.dispatch(ui.brigadeDrawer, {status: true, element})
    }
  }
}
</script>

<style>

</style>
