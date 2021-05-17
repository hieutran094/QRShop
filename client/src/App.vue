<template>
  <div id="app">
    <router-view name="header"></router-view>
    <main>
      <fade-transition origin="center" mode="out-in" :duration="250">
        <router-view />
      </fade-transition>
    </main>
    <router-view name="footer" />
  </div>
</template>

<script>
//import { FadeTransition } from "vue2-transitions";
import axios from "axios";
async function getProducts() {
  let response = await axios({
    method: "get",
    url: "/api/products",
    headers: {
      "x-access-token": localStorage.getItem("token"),
    },
  });
  return await response;
}
export default {
  name: "App",
  components: {
   // FadeTransition,
  },
  methods: {
    getProducts() {
      getProducts().then((response) => {
        console.log(response);
      });
    },
  },
};
</script>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
