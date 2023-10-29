import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import ElementPlus from "element-plus";
import "./styles/element-variables.scss";
import ElementLocale from "element-plus/lib/locale/lang/ru";

import Maska from "maska";
import moment from "moment";
import _ from "lodash";

moment.locale("ru");

const app = createApp(App);

app.config.globalProperties.moment = moment;
app.config.globalProperties._ = _;

app
  .use(store)
  .use(router)
  .use(Maska)
  .use(ElementPlus, { locale: ElementLocale, size: "mini", zIndex: 3000 })
  .mount("#app");
