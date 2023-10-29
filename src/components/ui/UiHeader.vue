<template>
  <header class="app_header">
    <div class="search_box">
      <div class="form_element">
        <search-box/>
      </div>
    </div>
    <div class="user_box">
      <div class="notify_box">

      </div>
      <a href="#" class="profile_link link">
        {{ user.employee.fio_short }}
      </a>
      <a href="#" class="logout_link link" @click="logout">
        Выход
      </a>
    </div>
  </header>
</template>

<script>
import SearchBox from "@/components/ui/SearchBox";
import {mapState} from "vuex";
import {setItem} from "@/helpers/persistanceStorage";
import {actionTypes} from "@/store/modules/auth";

export default {
  name: "UiHeader",
  components: {SearchBox},
  computed: {
    ...mapState({
      user: state => state.auth.user
    })
  },
  methods: {
    logout(){
      this.$store.dispatch(actionTypes.logout)
      this.$router.push('signin')
    }
  }
}
</script>

<style lang="scss">
.app_header {
  background-color: #fff;
  box-shadow: 0 0 20px rgba(50, 50, 50, 0.2);
  z-index: 999;
  position: fixed;
  top: 0;
  left: 75px;
  right: 0;
  padding: 4px 250px 4px 10px;
  height: 33px;
  box-sizing: border-box;

  .search_box {
    display: inline-block;
    vertical-align: top;
    width: 500px;
  }

  .notify_box {
    display: inline-block;
    vertical-align: top;
    border-right: 1px solid #ddd;
    padding: 4px;
    height: 16px;
    margin: 8px;
    line-height: 1;
  }

  .user_box {
    position: absolute;
    top: 0;
    right: 0;

    .link {
      display: inline-block;
      vertical-align: top;
      padding: 10px;
      font-size: 13px;
      color: #1F87EF;
      text-decoration: none;
      transition: color .2s ease-in-out;
      line-height: 1;

      &:hover {
        color: #1874CF;
      }
    }
  }
}
</style>
