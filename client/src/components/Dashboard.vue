<template>
  <div class="content">
    <div class="row">
      <div class="col-12">
        <card
          type="light"
          shadow
          scare="mb-3"
          headerClasses="bg-white"
          bodyClasses="px-lg-5 py-lg-5"
          class="border-0"
        >
          <div slot="header">
            <h4>Dashboard</h4>
          </div>
          <div class="row">
            <div class="col-md-12 col-sm-12 ">
              <TestChart></TestChart>
            </div>
          </div>
        </card>
      </div>
    </div>
  </div>
</template>
<script>
import TestChart from "./miniComponents/Chart/TestChart.vue";
export default {
  components: { TestChart },
};
</script>
<style>
.main-panel .content {
  padding: 80px 30px 30px 280px;
  min-height: calc(100vh - 70px);
}
@media screen and (max-width: 991px) {
  .main-panel .content {
    padding-left: 30px;
  }
}
</style>
