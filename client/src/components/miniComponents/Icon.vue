<template>
  <div
    class="icon icon-shape"
    :class="[
      {[`icon-shape-${type}`]:type},
      { 'rounded-circle': rounded },
      { [`text-${color}`]: color },
      { 'shadow ': shadow },
    ]"
  >
    <i :class="name" />
  </div>
</template>
<script>
export default {
  name: "icon",
  props: {
    name: {
      type: String,
      default: "",
    },
    rounded: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      default: "primary",
    },
    color: {
      type: String,
    },
    shadow: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
<style>
.icon {
    width: 3rem;
    height: 3rem;
}
.icon-shape {
    padding: 12px;
    text-align: center;
    display: -webkit-inline-box;
    display: -ms-inline-flexbox;
    display: inline-flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    border-radius: 50%;
}
.icon-shape-primary {
  color: #2643e9;
  background-color: rgba(138, 152, 235, 0.5);
}
.icon-shape-success {
    color: #1aae6f;
    background-color: rgba(84,218,161,.5);
}
.icon-shape-warning {
    color: #ff3709;
    background-color: rgba(252,140,114,.5);
}

</style>
