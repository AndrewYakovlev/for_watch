<template>
  <ui-drawer
      title="Сотрудник"
      :visible="visible"
      size="30%"
      @closed="closed"
      ownClass="settings_drawer drawer__employee"
  >
    <el-form ref="form" :model="element" label-position="top">
      <el-row :gutter="10">
        <el-col :span="8">
          <el-form-item label="Фамилия">
            <el-input v-model="element.surname" placeholder="Фамилия" @change="generateFio"/>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="Имя">
            <el-input v-model="element.name" placeholder="Имя" @change="generateFio"/>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="Имя">
            <el-input v-model="element.patronymic" placeholder="Отчество" @change="generateFio"/>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="10">
        <el-col :span="12">
          <el-form-item label="ФИО, полностью">
            <el-input v-model="element.fio_full" placeholder="Фамилия Имя Отчество"/>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="ФИО, сокращенно">
            <el-input v-model="element.fio_short" placeholder="Фамилия Имя Отчество"/>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="10">
        <el-col :span="12">
          <el-form-item label="ФИО, родительный падеж">
            <el-input v-model="element.fio_genitive" placeholder="Фамилия Имя Отчество"/>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="ФИО, дательный падеж">
            <el-input v-model="element.fio_dative" placeholder="Фамилия Имя Отчество"/>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="10">
        <el-col :span="12">
          <el-form-item label="ФИО, творительный патеж">
            <el-input v-model="element.fio_ablative" placeholder="Фамилия Имя Отчество"/>
          </el-form-item>
        </el-col>
      </el-row>

      <el-divider/>

      <el-row :gutter="10">
        <el-col :span="12">
          <el-form-item label="Телефон (используемый для входа)">
            <el-input v-model="element.user.phone" placeholder="Номер телефона" v-maska="phoneMask"
                      :placeholder="phonePlaceholder"/>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="Должность сотрудника">
            <el-select v-model="element.user.role">
              <el-option
                  v-for="role in roles"
                  :key="role"
                  :label="getRole(role)"
                  :value="role"
              />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="12">
          <el-form-item label="Офис сотрудника">
            <el-select
                v-if="offices.length"
                v-model="element.office"
                value-key="id"
                placeholder="Не привязан к офису"
                clearable
            >
              <el-option
                  v-for="office in offices"
                  :key="office.id"
                  :label="office.title"
                  :value="office"
              />
            </el-select>
          </el-form-item>
        </el-col>

      </el-row>

      <div class="actions">
        <el-button type="primary" @click="submit" :loading="submitting">
          <template v-if="element.id">Сохранить</template>
          <template v-else>Добавить</template>
        </el-button>
        <el-button type="default" @click="close">Отменить</el-button>
      </div>
    </el-form>
  </ui-drawer>
</template>

<script>
import {phoneMask, phonePlaceholder} from '@/objects/input.masks';
import UiDrawer from "@/components/ui/UiDrawer";
import {actionTypes as ui} from "@/store/modules/ui";
import {mapState} from "vuex";
import {getRole} from "@/helpers/role.helper";
import {getFullFio, getShortFio} from "@/helpers/fio.helper";
import {actionTypes as officeActions} from "@/store/modules/offices";
import {actionTypes as employeeActions} from "@/store/modules/employees";


export default {
  name: "EmployeeDrawer",
  components: {UiDrawer},
  props: {
    visible: {
      type: Boolean,
      default: false
    },
  },
  computed: {
    ...mapState({
      element: state => state.ui.drawers.employee.element,
      zIndex: state => state.ui.zIndex,
      submitting: state => state.employees.submitting,
      offices: state => state.offices.rows
    })
  },
  data() {
    return {
      phoneMask: phoneMask,
      phonePlaceholder: phonePlaceholder,
      roles: ['admin', 'rop', 'manager', 'fitter', 'stockman', 'constructor']
    }
  },
  methods: {
    close() {
      this.closed()
    },
    closed() {
      this.$store.dispatch(ui.employeeDrawer, {status: false, element: null})
    },
    submit() {
      this.$store.dispatch(employeeActions.save, this.element).then(() => {
        this.$store.dispatch(employeeActions.load).then(() => {
          this.$store.dispatch(ui.employeeDrawer, {status: false})
        })
      }).catch(err => {
        console.log(err)
      })
    },
    getRole: getRole,
    generateFio() {
      if (this.element.surname && this.element.name && this.element.patronymic) {

        const person = {
          first: this.element.name,
          last: this.element.surname,
          middle: this.element.patronymic,
        };

        this.element.fio_dative = getFullFio(person, 'dative').value;
        this.element.fio_genitive = getFullFio(person, 'genitive').value;
        this.element.fio_ablative = getFullFio(person, 'instrumental').value;
        this.element.fio_full = getFullFio(person, 'nominative').value
        this.element.fio_short = getShortFio(person, 'nominative').value

      }
    }
  }
}
</script>
