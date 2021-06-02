<template>
  <component
    :is="tag"
    class="badge"
    :class="[`badge-${type}`, { 'badge-pill': rounded }]"
  >
    <slot>
    </slot>
  </component>
</template>
<script>
export default {
  name: "badge",
  props: {
    tag: {
      type: String,
      default: "span",
    },
    type: {
      type: String,
      default: "primary",
    },
    rounded: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
<style>
.badge-primary {
  color: #2643e9;
  background-color: rgba(203, 210, 246, 0.5);
}
.badge-success {
  color: #1aae6f;
  background-color: rgba(147, 231, 195, 0.5);
}
.badge-warning {
  color: #ff3709;
  background-color: rgba(254, 201, 189, 0.5);
}
.badge {
    text-transform: uppercase;
}
.badge-pill {
    padding-right: .875em;
    padding-left: .875em;
    margin: 0 0.3em 0 0.3em;
    font-weight: 390;
}
</style>
