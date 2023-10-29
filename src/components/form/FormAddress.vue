<template>
  <el-form-item :label="label">
    <el-autocomplete
        v-model="inputValue"
        placeholder="Введите адрес и выберите один из вариантов"
        clearable
        :debounce="600"
        :trigger-on-focus="false"
        :fetch-suggestions="querySearch"
        @select="handleSelect"
        @change="handleChange"
    >
      <template #default="{ item }">
        <div class="row address">{{ item.value }}</div>
      </template>
    </el-autocomplete>
  </el-form-item>
</template>

<script>
import api from '@/api/autocomplete'
import {normalizeAddress} from "@/helpers/address.helper";

export default {
  name: "FormAddress",
  emits: ['select', 'clear'],
  props: {
    label: {
      type: String,
      default: 'Адрес'
    },
    object: {
      required: false
    }
  },
  data() {
    return {
      inputValue: '',
      address: null
    }
  },
  methods: {
    querySearch(q, cb) {
      api.searchAddress(q).then(response => {
        return cb(response.data)
      }).catch(err => {
        console.log(err)
        return cb([])
      })
    },
    handleSelect(address) {
      this.address = normalizeAddress(address)
      this.$emit('select', this.address);
      this.inputValue = this.address.value
    },
    handleChange(el){
      if(el.length === 0) this.$emit('select', this.address)
    }
  },
  mounted() {
    if(this.object?.value){
      this.address = this.object
      this.inputValue = this.address.value
    }
  }
}
</script>
