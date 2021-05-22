<template>
  <div class="wrapper">
    <headers></headers>
    <main>
      <fade-transition origin="center" mode="out-in" :duration="250">
        <router-view />
      </fade-transition>
    </main>
    <footers></footers>
  </div>
</template>
<script>
import footers from "./footer.vue";
import headers from "./header.vue";
export default {
  name: "MainLayout",
  components: {
    headers,
    footers,
  },
};
</script>
