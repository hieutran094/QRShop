import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import "@/assets/scss/main.scss";
import "sweetalert2/dist/sweetalert2.min.css";
import globalComponets from "./globalComponets.js";
import ClickOutside from "vue-click-outside";
import VueLazyload from "vue-lazyload";
import VueSweetalert2 from "vue-sweetalert2";
import Client from "./VueClient.js";
import VueCookies from "vue-cookies";
const SidebarStore = {
  showSidebar: false,
  sidebarLinks: [],
  displaySidebar(value) {
    this.showSidebar = value;
  },
};
export default {
  install(Vue) {
    let app = new Vue({
      data: {
        sidebarStore: SidebarStore,
      },
    });
    Vue.prototype.$sidebar = app.sidebarStore;
    Vue.use(VueCookies);
    Vue.prototype.$client = new Client(Vue, () => {});
    Vue.use(globalComponets);
    Vue.use(VueLazyload);
    Vue.use(VueSweetalert2);
    Vue.use(BootstrapVue);
    Vue.use(IconsPlugin);
    Vue.directive("click-outside", ClickOutside);
  },
};
