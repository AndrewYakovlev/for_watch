<template>
  <aside class="side_bar">
    <div class="logo">
      <router-link to="/" class="logo_link">
        s.ERP
      </router-link>
    </div>
    <div class="navigations">
      <ul class="menu__list">
        <li v-for="element in menu" :key="element.path" class="menu__element">
          <router-link :to="element.path" class="menu__link" active-class="active">
            <div class="icon">
              <img :src="element.icon" :alt="element.title">
            </div>
            {{ element.title }}
          </router-link>
        </li>
      </ul>
    </div>
  </aside>
</template>

<script>
import {icon} from "@/objects/icons";
import catalog from "@/pages/Catalog";
import purchases from "@/pages/Purchases";

export default {
  name: "UiSideBar",
  data(){
    return {
      menu: [
        {path: '/requests', title: 'Обращения', icon: icon.requests},
        {path: '/orders', title: 'Заказы', icon: icon.orders},
        {path: '/tasks', title: 'Задачи', icon: icon.tasks},
        {path: '/contacts', title: 'Контакты', icon: icon.contacts},
        {path: '/events', title: 'Замеры и монтаж', icon: icon.events},
        {path: '/catalog', title: 'Товары и услуги', icon: icon.catalog},
        {path: '/purchases', title: 'Закупки', icon: icon.purchases},
        {path: '/payments', title: 'Деньги', icon: icon.payments},
        {path: '/settings', title: 'Настройки', icon: icon.settings},
        {path: '/reports', title: 'Отчеты', icon: icon.reports},
      ]
    }
  }
}
</script>

<style lang="scss">
.side_bar{
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  background-color: #1F87EF;
  color: #fff;
  width: 75px;
  box-shadow: 0 0 15px rgba(50,50,50,0.2);
  font-size: 12px;
  z-index: 1001;
  height: 100vh;
  overflow-x: hidden;
  overflow-y: hidden;

  .logo{
    height: 32px;
    text-align: center;
    border-bottom: 1px solid rgba(255,255,255,0.05);

    &_link{
      text-decoration: none;
      color: #fff;
      font-weight: 900;
      font-size: 18px;
      display: block;
      padding: 7px;
    }
  }

  .navigations{
    padding: 10px 0;
    height: calc(100vh - 32px);
    overflow-y: auto;
    overflow-x: hidden;
    &::-webkit-scrollbar{
      width: 0;
    }

    .menu{
      &__list{
        list-style: mone;
        padding: 0;
        margin: 0;
      }

      &__element{
        display: block;
        text-align: center;
      }

      &__link{
        display: block;
        color: #fff;
        text-decoration: none;
        padding: 10px 5px;
        font-size: 11px;
        background-color: transparent;
        transition: background-color .2s ease-in-out;

        .icon{
          padding: 0 20px;
          margin-bottom: 3px;
          img{
            max-width: 100%;
          }
        }

        &.active,&.active:hover{
          background-color: #1874CF;
        }

        &:hover{
          background-color: #1C7EDF;
        }
      }
    }

  }
}
</style>
