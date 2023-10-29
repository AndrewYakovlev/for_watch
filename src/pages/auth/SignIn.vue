<template>
  <div class="box">
    <div class="logo">
      <router-link to="/" class="logo_link">
        s.ERP
      </router-link>
      <p class="desc">Бизнес под контролем</p>
    </div>
    <div class="block">
      <h1>Авторизация</h1>

      <el-form
          :model="form"
          label-position="top"
          hide-required-asterisk
          @submit.prevent="submitForm"
      >
        <div class="errors">
          <el-alert
              type="error"
              :title="serverError"
              v-if="serverError"
              @close="resetData"
          />
          <template v-if="errors">
            <el-alert
                type="error"
                :title="error"
                v-for="error in errors"
                @close="resetData"
            />
          </template>
        </div>


        <el-form-item label="Номер телефона">
          <el-input
              autofocus
              v-model="form.phone"
              v-maska="phoneMask"
              :placeholder="phonePlaceholder"
              @keydown.enter.prevent="submitForm"
              :disabled="codeReady"
          ></el-input>
        </el-form-item>
        <el-form-item label="Код подтверждения из SMS" v-if="codeReady">
          <el-input
              autofocus
              v-model="form.code"
              :v-maska="smsCodeMask"
              :placeholder="smsCodePlaceholder"
              @keydown.enter.prevent="submitForm"
          />
        </el-form-item>
        <div class="form_actions">
          <el-button type="primary" @click="submitForm" :loading="loading" :disabled="!canSubmit">
            <template v-if="codeReady">Войти</template>
            <template v-else>Получить код</template>
          </el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import {phoneMask, phonePlaceholder, smsCodeMask, smsCodePlaceholder} from '@/objects/input.masks';
import api from '@/api/auth';
import {setItem} from "@/helpers/persistanceStorage";
import {validatePhoneFormat, validatePhoneLength} from "@/helpers/customValidators";

export default {
  name: "SignIn",
  data() {
    return {
      form: {
        phone: '',
        code: '',
      },
      errors: {},
      serverError: null,
      codeReady: false,
      loading: false,
      uid: '',
      phoneMask: phoneMask,
      phonePlaceholder: phonePlaceholder,
      smsCodePlaceholder: smsCodePlaceholder,
      smsCodeMask: smsCodeMask,
    }
  },
  computed: {
    canSubmit() {
      if (this.codeReady) {
        return this.form.code.length === 6;
      } else {
        return !!(validatePhoneFormat(this.form.phone, false) && validatePhoneLength(this.form.phone, false));
      }
    }
  },
  methods: {
    resetData() {
      this.errors = {}
      this.serverError = null
    },
    submitForm() {
      this.resetData()

      let valid = true

      this.loading = true;

      if (!this.form.phone.length) {
        this.errors.phone = "Введите номер телефона";
        valid = false;
      } else {
        if (validatePhoneLength(this.form.phone) !== true) {
          valid = false;
          this.errors.phone = validatePhoneLength(this.form.phone).error
        } else if (validatePhoneFormat(this.form.phone) !== true) {
          valid = false;
          this.errors.phone = validatePhoneFormat(this.form.phone).error
        }
      }
      if (!this.codeReady) {
        if (valid) {
          api.getSmsCode({phone: this.form.phone}).then((response) => {
            if (response.data.id) {
              this.uid = response.data.id
              this.codeReady = true
            }
          }).catch(error => {
            //this.serverError = error.response.data.message
            console.log(error)
          })
        }
      } else {
        if (!this.form.code) {
          this.errors.code = 'Введите код подтверждения'
          valid = false
        } else {
          if (this.form.code.length !== 6) {
            this.errors.code = 'Проверьте код подтверждения'
            valid = false
          }

          if (valid) {
            api.confirmSmsCode({uid: this.uid, code: this.form.code})
                .then(response => {
                  if (response.data.token) {
                    setItem('accessToken', response.data.token);
                    this.$router.push('/')
                  }
                })
                .catch(error => {
                  this.serverError = error.response.data.message
                })
          }
        }
      }


      this.loading = false;
    }
  }
}
</script>

<style lang="scss">
.box {
  box-sizing: border-box;
  margin: auto;
  width: 300px;
  min-height: 300px;

  h1 {
    margin-bottom: 16px;
  }

  .errors {
    margin-bottom: 10px;
  }

  .logo {
    text-align: center;
    margin-bottom: 18px;

    &_link {
      font-size: 54px;
      text-decoration: none;
      color: #1874CF;
      font-weight: bold;
    }

    .desc {
      color: #999;
      font-size: 13px;
      margin-top: 6px;
    }
  }

  .block {
    background-color: #fff;
    border-radius: 2px;
    padding: 20px;
    text-align: center;
    display: block;

    h1 {
      font-size: 18px;
      font-weight: bold;
    }

    .form_actions {
      text-align: right;
    }
  }
}
</style>
