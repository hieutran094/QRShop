import Vue from "vue";
import App from "./App.vue";
import VueRouter from "vue-router";
import axios from "axios";
import mainOption from './plugins/mainOption.js'
import vuetify from './plugins/vuetify.js'
import { router } from "./router/routes.js";
Vue.use(mainOption);
Vue.use(VueRouter);
Vue.config.productionTip = false;
Vue.prototype.$http=axios;
new Vue({
  vuetify,
  router,
  render: (h) => h(App),
}).$mount("#app");
