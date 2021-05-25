import Vue from "vue";
import VueRouter from "vue-router";
import MainLayout from "../layout/MainLayout.vue";
import DashboardLayout from "../layout/DashboardLayout.vue";
import Dashboard from "../components/Dashboard.vue"
import Users from "../components/Users.vue"
import home from "../components/Home.vue";
import login from "../components/Login.vue";
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
      path: "/admin",
      component: DashboardLayout,
      redirect: "/admin/dashboard",
      children: [
        {
          path: "dashboard",
          component: Dashboard
        },
        {
          path: "users",
          component: Users
        }
      ],
    }
    // {path:'*',components:{}}
  ],
});
// router.beforeEach(
//   function(to, from, next) {
//     let web = ["/", "login"];
//     if (web.includes(to.name)) {
//       next();
//     } else {
//         this.$client.CheckToken((e) => {
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
