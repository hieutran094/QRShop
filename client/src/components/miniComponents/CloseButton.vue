<template>
  <button
    type="button"
    class="navbar-toggler"
    data-toggle="collapse"
    @click="handleClick"
    :data-target="`#${target}`"
    :aria-controls="target"
    :aria-expanded="expanded"
    aria-label="Toggle navigation"
  >
    <span></span>
    <span></span>
  </button>
</template>
<script>
export default {
  name: "close-button",
  props: {
    target: {
      type: [String, Number],
      description: "Close button target element",
    },
    expanded: {
      type: Boolean,
      description: "Whether button is expanded (aria-expanded attribute)",
    },
  },
  methods: {
    handleClick(evt) {
      this.$emit("click", evt);
    },
  },
};
</script>
<style lang="scss" scoped>
.navbar-toggler span {
  display: block;
  position: absolute;
  width: 100%;
  height: 2px;
  border-radius: 2px;
  opacity: 1;
  background: #283448;
   &:nth-child(1) {
    -webkit-transform: rotate(135deg);
    transform: rotate(135deg);
  }
  &:nth-child(2) {
    -webkit-transform: rotate(-135deg);
    transform: rotate(-135deg);
  }
}
</style>
