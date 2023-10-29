<template>
  <div class="page with_side">
    <div class="side">
      <div class="settings_menu">
        <ul class="menu__list">
          <li class="menu__element" v-for="el in menu" :key="el.path">
            <router-link :to="el.path" class="menu__link" active-class="active">
              {{el.title}}
            </router-link>
          </li>
        </ul>
      </div>
    </div>
    <div class="page_content">
      <router-view/>
    </div>
  </div>
</template>

<script>
export default {
  name: "Settings",
  data() {
    return {
      menu: [
        {path: '/settings/offices', title: 'Офисы'},
        {path: '/settings/employees', title: 'Сотрудники'},
        {path: '/settings/brigades', title: 'Бригады'},
        {path: '/settings/legals', title: 'Юр. лица'},
        {path: '/settings/cashboxes', title: 'Кассы'},
        {path: '/settings/expenses', title: 'Статьи расходов'},
        {path: '/settings/storages', title: 'Склады'},
        {path: '/settings/suppliers', title: 'Поставщики'},
        {path: '/settings/statuses/request', title: 'Статусы обращений'},
        {path: '/settings/statuses/order', title: 'Статусы заказов'},
        {path: '/settings/documents/templates', title: 'Шаблоны документов'},
        {path: '/settings/integrations', title: 'Интеграции'},
      ]
    }
  }
}
</script>

<style lang="scss">
  .page{
    .side{
      .menu{
        &__link{
          display: block;
          text-decoration: none;
          color: #333;
          font-size: 13px;
          padding: 8px 15px;
          background-color: transparent;
          transition: background-color .2s ease-in-out;

          &:hover{
            background-color: #eaeaea;
          }

          &.active, &.active:hover{
            background-color: #dedede;
          }
        }
      }
    }
  }

</style>
