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
      <button-tonggle
        :toggled="toggled"
        :target="contentId"
        @click.native.stop="toggled = !toggled"
      >
      </button-tonggle>
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
  components: {
  },
  methods: {
    closeMenu() {
      this.toggled = false;
    },
  },
};
</script>
<style  scoped>
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
@media screen and (max-width: 991.98px) {
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
  /* .navbar-light .navbar-toggler {
    border-color: rgba(255, 255, 255, 0);
    transition: all 0.15s linear;
  } */
  .navbar >>> .navbar-toggler-icon {
    background-image: url("data:image/svg+xml;charset=utf8,%3Csvg viewBox='0 0 30 30' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath stroke='rgba(255, 255, 255, 0.95)' stroke-width='2' stroke-linecap='round' stroke-miterlimit='10' d='M4 7h22M4 15h22M4 23h22'/%3E%3C/svg%3E");
  }
}
</style>
