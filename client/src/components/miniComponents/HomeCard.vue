<template>
  <card class="border-0" shadow body-classes="py-5" :hover="card.hover">
    <icon :name="card.icon" :type="card.type" rounded class="mb-4 border-dark">
    </icon>
    <h6 class="text-primary text-uppercase" :class="[`text-${card.type}`]">
      {{ card.header }}
    </h6>
    <p class="description mt-3">
      {{ card.content }}
    </p>
    <div>
      <badge
        v-for="item in card.badge"
        :type="card.type"
        rounded
        :key="randomID(item)"
        >{{ item }}</badge
      >
    </div>
    <base-button
      tag="a"
      :type="card.type"
      @click="$router.push(card.url)"
      class="mt-4"
    >
      Learn More
    </base-button>
  </card>
</template>
<script>
export default {
  name: "home-card",
  props: {
    card: Object,
  },
  methods: {
    randomID: function(item) {
      return `ID${item}${parseInt(Math.random() * 99).toString()}`;
    },
  },
  watch: {},
};
</script>
<style>
.text-primary {
  color: #5e72e4 !important;
}
.text-success {
  color: #2dce89 !important;
}
.text-warning {
  color: #fb6340 !important;
}
.btn-primary,
.btn-primary:hover {
  color: #fff !important;
  background-color: #5e72e4;
  border-color: #5e72e4;
}
.btn-success,
.btn-success:hover {
  color: #fff !important;
  background-color: #2dce89;
  border-color: #2dce89;
}
.btn-warning,
.btn-warning:hover {
  color: #fff !important;
  background-color: #fb6340;
  border-color: #fb6340;
}
</style>
