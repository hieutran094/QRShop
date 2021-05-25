<template>
  <div class="wrapper">
    <base-sidebar></base-sidebar>
    <div class="main-panel">
      <headers></headers>
      <main >
        <fade-transition origin="center" mode="out-in" :duration="250">
          <router-view />
        </fade-transition>
      </main>
      <footers></footers>
    </div>
  </div>
</template>
<script>
import footers from "./footerAdmin.vue";
import headers from "./headerAdmin.vue";
export default {
  name: "DashboardLayout",
  components: {
    headers,
    footers,
  },
};
</script>
<style lang="scss" scoped>
@media screen and (max-width: 991px) {
  .footer {
    padding-left: 30px !important;
  }
  .footer .container {
    margin-left: 0 !important;
  }
}
@media screen and (max-width: 991px) {
  .navbar-toggler-bar + .navbar-toggler-bar {
    margin-top: 7px;
  }
  .navbar-light .navbar-toggler {
    color: rgba(0, 0, 0, 0);
    border-color: rgba(0, 0, 0, 0);
  }
  .navbar .navbar-toggler-bar {
    display: block;
    position: relative;
    width: 22px;
    height: 1px;
    border-radius: 1px;
    background: #fff;
  }
}
@media screen and (max-width: 991px) {
  .sidebar.active {
    position: fixed;
    display: block;
    margin-left: 0px;
    top: 0;
    height: 100%;
    width: 260px;
    right: auto;
    left: 0;
    margin: 0;
    border-radius: 0;
    z-index: 1032;
    visibility: visible;
    overflow-y: visible;
    padding: 0;
    -webkit-transform: translate3d(0px, 0, 0);
    transform: translate3d(0px, 0, 0);
  }
  .nav-open .main-panel {
    right: 0;
    -webkit-transform: translate3d(260px, 0, 0);
    transform: translate3d(260px, 0, 0);
  }
}

.main-panel {
  float: right;
  width: 100%;
  min-height: 100vh;
  background: -webkit-gradient(
    linear,
    left top,
    left bottom,
    from(#1e1e2f),
    to(#1e1e24)
  );
  background: linear-gradient(#1e1e2f, #1e1e24);
  -webkit-transition: all 0.5s cubic-bezier(0.685, 0.0473, 0.346, 1);
  transition: all 0.5s cubic-bezier(0.685, 0.0473, 0.346, 1);
}
.footer {
  padding: 24px 0 24px 250px;
}
</style>
