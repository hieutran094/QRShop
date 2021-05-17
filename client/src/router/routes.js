import Vue from 'vue';
import VueRouter from 'vue-router';
import home from '../components/Home.vue';
import HelloWorld from '../components/HelloWorld.vue'
import footer from '../layout/footer.vue';
import header from '../layout/header.vue'
import login from '../components/Login.vue'

Vue.use(VueRouter);

const router=new VueRouter({
    mode: process.env.NODE_ENV === 'production' ? 'hash':'history',
    routes:[
        //{path:'/',components:{header:header,default :HelloWorld,footer:footer}},
        {path:'/login',components:{header:header,default :login,footer:footer}},
        {path:'/',components:{header:header,default :home,footer:footer}},
        {path:'/hello',components:{header:header,default:HelloWorld}},
        // {path:'*',components:{}}
    ]
});
export {router};