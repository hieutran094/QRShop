import Vue from "vue";
import App from "./App.vue";
import VueRouter from "vue-router";
import { router } from "./router/routes.js";
import axios from "axios";
import mainOption from './plugins/mainOption.js'

Vue.use(VueRouter);
Vue.use(mainOption);
Vue.config.productionTip = false;
Vue.prototype.$http=axios;

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
