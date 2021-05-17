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
    <span class="navbar-toggler-icon"></span>
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