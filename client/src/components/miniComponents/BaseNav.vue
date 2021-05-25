<template>
  <nav
    class="navbar "
    :class="[
      { 'navbar-expand-lg': expand },
      { [`navbar-${effect}`]: effect },
      { 'navbar-transparent': transparent },
      { [`bg-${type}`]: type },
    ]"
  >
    <div class="container">
      <slot name="brand"> </slot>
      <slot name="tonggle-sidebar"></slot>
      <div class="right-button">
        <button-tonggle
          
          :toggled="toggled"
          :target="contentId"
          @click.native.stop="toggled = !toggled"
        >
          <div slot="icon">
            <span class="navbar-toggler-bar navbar-kebab dot1"></span>
            <span class="navbar-toggler-bar navbar-kebab dot2"></span>
            <span class="navbar-toggler-bar navbar-kebab dot3"></span>
          </div>
        </button-tonggle>
      </div>
      <div
        class="collapse navbar-collapse"
        :id="contentId"
        :class="{ show: toggled }"
        v-click-outside="closeMenu"
      >
        <div class="navbar-collapse-header">
          <slot name="content-header" :close-menu="closeMenu"></slot>
        </div>
        <slot></slot>
      </div>
    </div>
  </nav>
</template>
<script>
export default {
  name: "base-nav",
  props: {
    expand: { type: Boolean, default: false },
    type: { type: String },
    effect: { type: String, default: "light" },
    contentId: {
      type: [String, Number],
      default: `ID${Math.random().toString()}`,
    },
    transparent: { type: Boolean, default: true },
  },
  data() {
    return { toggled: false };
  },
  components: {},
  methods: {
    closeMenu() {
      this.toggled = false;
    },
  },
};
</script>
<style scoped>
.navbar-transparent {
  background: transparent !important;
  position: absolute;
  width: 100%;
  z-index: 100;
}
.navbar-transparent .navbar-nav >>> .nav-link {
  color: hsla(0, 0%, 100%, 0.95);
}
.navbar-transparent .navbar-nav >>> .nav-link :hover {
  color: hsla(0, 0%, 100%, 0.95) !important;
}
@media screen and (max-width: 991px) {
  .navbar-collapse.show {
    padding: 1.5rem;
    border-radius: 0.25rem;
    background: #fff;
    color: #000;
    -webkit-box-shadow: 0 50px 100px rgb(50 50 93 / 10%),
      0 15px 35px rgb(50 50 93 / 15%), 0 5px 15px rgb(0 0 0 / 10%);
    box-shadow: 0 50px 100px rgb(50 50 93 / 10%),
      0 15px 35px rgb(50 50 93 / 15%), 0 5px 15px rgb(0 0 0 / 10%);
    -webkit-animation: show-navbar-collapse 0.2s ease forwards;
    animation: show-navbar-collapse 0.2s ease forwards;
  }
  .navbar-collapse .navbar-toggler {
    width: 20px;
    height: 20px;
    position: relative;
    cursor: pointer;
    display: inline-block;
    padding: 0;
  }
  .navbar-brand {
    display: none;
  }
  .innner-button {
    position: absolute;
    top: 20px;
    left: 30px;
    overflow: auto;
    max-height: 100vh;
  }
  .right-button {
    position: absolute;
    top: 20px;
    right: 30px;
    overflow: auto;
    max-height: 100vh;
  }
  .navbar-light .navbar-nav .nav-link[data-v-ad454dee]:hover,
  .navbar-light .navbar-nav .nav-link[data-v-ad454dee]:focus {
    color: #172b4d !important;
    transition: all 0.15s linear;
  }
  .navbar-transparent .navbar-nav[data-v-039c2940] .nav-link :hover {
    color: #172b4d !important;
    transition: all 0.15s linear;
  }
  .navbar-nav >>> .nav-link {
    padding: 0.625rem 0;
    color: #172b4d !important;
    transition: all 0.15s linear;
  }
  
}
</style>
