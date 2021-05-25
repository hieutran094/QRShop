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
    <slot name="icon"> </slot>
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
  .navbar .navbar-toggler-bar + .navbar-toggler-bar {
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
    height: 1.5px;
    border-radius: 1px;
    background: #fff;
  }
  .navbar .navbar-toggler-bar.navbar-kebab {
    height: 4px;
    width: 4px;
    margin-bottom: 3px;
    margin-top: 0px;
    border-radius: 50%;
  }
}
.navbar-toggler {
  padding: 0.25rem 0.75rem;
  font-size: 0.99925rem;
  line-height: 1;
  background-color: transparent;
  border: 0.0625rem solid transparent;
  border-radius: 0.25rem;
}
</style>
