import Vue from "vue";
import VueRouter from "vue-router";
import MainLayout from "../layout/MainLayout.vue";
import DashboardLayout from "../layout/DashboardLayout.vue";
import Dashboard from "../components/Dashboard.vue";
import Users from "../components/Users.vue";
import Role from "../components/Role.vue";
import home from "../components/Home.vue";
import CardManager from "../components/CardManager.vue";
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
          name: "login",
          meta: {
            guest: true,
          },
        },
        {
          path: "home",
          component: home,
          name: "home",
          meta: {
            guest: true,
          },
        },
      ],
    },
    {
      path: "/admin",
      component: DashboardLayout,
      redirect: "/admin/dashboard",
      meta: {
        requiresAuth: true,
        is_admin: true,
      },
      children: [
        {
          path: "dashboard",
          component: Dashboard,
          name: "dashboard",
          meta: {
            requiresAuth: true,
            is_admin: true,
          },
        },
        {
          path: "users",
          component: Users,
          name: "users",
          meta: {
            requiresAuth: true,
            is_admin: true,
          },
        },
        {
          path: "role",
          component: Role,
          name: "role",
          meta: {
            requiresAuth: true,
            is_admin: true,
          },
        },
        {
          path: "card",
          component: CardManager,
          name: "card",
          meta: {
            requiresAuth: true,
            is_admin: true,
          },
        }
      ],
    },
    {
      path: "*",
      component: () => import("../components/Notfound.vue"),
    },
  ],
});
let seft = Vue.prototype;
router.beforeEach(async (to, from, next) => {
  if (
    seft.$client.Token == null &&
    seft.$cookies.get("Token") != null &&
    seft.$cookies.get("Token") != undefined &&
    !seft.$client.IsOpen
  ) {
    //wait for websocket init successfuly
    while (!seft.$client.IsOpen) {
      //sleep 0.001 seconds until websocket init successfuly
      await seft.$client.sleep(1);
    }
    seft.$client.CheckToken(function() {
      if (to.matched.some((record) => record.meta.requiresAuth)) {
        if (seft.$client.Token == null || seft.$client.Token == "") {
          next({
            path: "login",
            params: { nextUrl: to.fullPath },
          });
        } else {
          if (to.matched.some((record) => record.meta.is_admin)) {
            if (seft.$client.UserInfo.Level == 9) {
              next();
            } else {
              seft.$client.CheckPermission(to.fullPath, function(e) {
                if (e.Status == "Pass") next();
                else next(from.fullPath);
              });
            }
          } else {
            next();
          }
        }
      } else if (to.matched.some((record) => record.meta.guest)) {
        if (
          to.fullPath === "/login" &&
          seft.$client.Token != null &&
          seft.$client.Token != ""
        ) {
          next(from.fullPath);
        } else if (seft.$client.Token == null) {
          next();
        } else {
          next();
        }
      } else {
        next();
      }
    });
  } else {
    if (to.matched.some((record) => record.meta.requiresAuth)) {
      if (seft.$client.Token == null || seft.$client.Token == "") {
        next({
          path: "login",
          params: { nextUrl: to.fullPath },
        });
      } else {
        if (to.matched.some((record) => record.meta.is_admin)) {
          if (seft.$client.UserInfo.Level == 9) {
            next();
          } else {
            seft.$client.CheckPermission(to.fullPath, function(e) {
              if (e.Status == "Pass") next();
              else next(from.fullPath);
            });
          }
        } else {
          next();
        }
      }
    } else if (to.matched.some((record) => record.meta.guest)) {
      if (
        to.fullPath === "/login" &&
        seft.$client.Token != null &&
        seft.$client.Token != ""
      ) {
        next(from.fullPath);
      } else if (seft.$client.Token == null) {
        next();
      } else {
        next();
      }
    } else {
      next();
    }
  }
});
export { router };
