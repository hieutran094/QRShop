<template>
  <div
    class="card "
    :class="[
      { [`bg-${type}`]: type },
      { [`${scare}`]: scare },
      { shadow: shadow },
      {'card-lift--hover':hover}
    ]"
  >
    <div class="card-header" :class="headerClasses" v-if="$slots.header">
      <slot name="header"></slot>
    </div>
    <div class="card-body" :class="bodyClasses">
      <slot></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: "card",
  props: {
    type: {
      type: String,
      description: "Card type",
    },
    scare: {
      type: String,
    },
    gradient: {
      type: String,
      description: "Card background gradient type (warning,danger etc)",
    },
    hover: {
      type: Boolean,
      description: "Whether card should move on hover",
    },
    shadow: {
      type: Boolean,
      description: "Whether card has shadow",
    },
    shadowSize: {
      type: String,
      description: "Card shadow size",
    },
    noBody: {
      type: Boolean,
      default: false,
      description: "Whether card should have wrapper body class",
    },
    bodyClasses: {
      type: [String, Object, Array],
      description: "Card body css classes",
    },
    headerClasses: {
      type: [String, Object, Array],
      description: "Card header css classes",
    },
    footerClasses: {
      type: [String, Object, Array],
      description: "Card footer css classes",
    },
  },
};
</script>
<style>
.card-lift--hover:hover {
    -webkit-transform: translateY(-20px);
    transform: translateY(-20px);
    -webkit-transition: all .15s ease;
    transition: all .15s ease;
}

</style>
