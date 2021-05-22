import Vue from "vue";
import VueRouter from "vue-router";
import MainLayout from "../layout/MainLayout.vue";
import DashboardLayout from "../layout/DashboardLayout.vue";
import home from "../components/Home.vue";
//import HelloWorld from "../components/HelloWorld.vue";
import login from "../components/Login.vue";
//import sidebar from "../components/miniComponents/BaseSidebar.vue";
Vue.use(VueRouter);
const router = new VueRouter({
  mode: process.env.NODE_ENV === "production" ? "hash" : "history",
  routes: [
    {
      path: "/",
      component: MainLayout,
      redirect: "/home",
      children: [
        {
          path: "login",
          component: login,
        },
        {
          path: "home",
          component: home,
        },
      ],
    },
    {
      path: "/dashboard",
      component: DashboardLayout,
      // redirect: "/dashboard",
      children: [
        {
          path: "dashboard",
          component: login,
        }
        // {
        //   path: "home",
        //   component: home,
        // },
      ],
    }
    // {path:'*',components:{}}
  ],
});
// seft=router.app;
// router.beforeEach(
//   function(to, from, next) {
//     let web = ["/", "login"];
//     if (web.includes(to.name)) {
//       next();
//     } else {
//         seft.$client.CheckToken((e) => {
//         if (e.Status === "Pass") {
//           next();
//         } else {
//           router.push({
//             name: "/",
//             params: {
//               serverError: true,
//               serverMsg: "Please login to continue.",
//             },
//           });
//         }
//       });
//     }
//   }
// );
export { router };
