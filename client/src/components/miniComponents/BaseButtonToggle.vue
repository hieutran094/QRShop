<template>
  <button
    class="navbar-toggler"
    type="button"
    data-toggle="collapse"
    :data-target="target"
    :aria-controls="target"
    :aria-expanded="toggled"
    aria-label="Toggle navigation"
  >
    <!-- <span class="navbar-toggler-icon"></span> -->
    <span class="navbar-toggler-bar bar1"></span>
    <span class="navbar-toggler-bar bar1"></span>
    <span class="navbar-toggler-bar bar1"></span>
  </button>
</template>
<script>
export default {
  name: "button-tonggle",
  props: {
    target: { type: [String, Number] },
    toggled: { type: Boolean, default: false },
  },
};
</script>
<style lang="scss">
@media screen and (max-width: 991px) {
  .navbar-toggler-bar + .navbar-toggler-bar {
    margin-top: 7px;
  }
}
.navbar-toggler {
    padding: .25rem .75rem;
    font-size: .99925rem;
    line-height: 1;
    background-color: transparent;
    border: .0625rem solid transparent;
    border-radius: .25rem;
}
</style>
