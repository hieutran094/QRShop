<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
  components: {},
  methods: {
    toggleNavOpen() {
      let root = document.getElementsByTagName("html")[0];
      root.classList.toggle("nav-open");
    },
  },
  mounted() {
    this.$watch("$sidebar.showSidebar", this.toggleNavOpen);
  },
};
</script>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.nav-open body {
  background-color: #1e1e2f !important;
}
@media screen and (max-width: 991px) {
  .nav-open body {
    overflow-x: hidden;
  }
}
</style>
