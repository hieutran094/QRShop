import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import "@/assets/scss/main.scss";
import 'sweetalert2/dist/sweetalert2.min.css';
import globalComponets from './globalComponets.js';
import clickOutside from './click-outside.js'
import VueLazyload from "vue-lazyload";
import VueSweetalert2 from 'vue-sweetalert2';
import Client from './VueClient.js'
export default {
    install(Vue) {
        Vue.prototype.$client=new Client(Vue);
        Vue.use(globalComponets);
        Vue.use(VueLazyload);
        Vue.use(BootstrapVue);
        Vue.use(VueSweetalert2);
        Vue.use(IconsPlugin);
        Vue.directive("click-outside",clickOutside);
        //Vue.router("router",router), 
    }
}