<template>
  <nav
    class="sidebar"
    :class="[{ active: $sidebar.showSidebar }]"
    v-click-outside="ClickOutSide"
    id="contentId"
  >
    <div class="sidebar-header">
      <a> <b-icon icon="shop" scale="2"></b-icon>QRSHOP MANAGER </a>
    </div>

    <ul class="list-unstyled components">
      <li class="active">
        <base-sidebar-link link="/admin/dashboard" icon="pie-chart-fill" content="Dashboard"></base-sidebar-link>
      </li>
      <li class="active">
        <base-sidebar-link link="/admin/role" icon="caret-right-square-fill" content="Role"></base-sidebar-link>
      </li>
      <li class="active">
        <base-sidebar-link link="/admin/users" icon="people-fill" content="User"></base-sidebar-link>
      </li>
      <li class="active">
        <base-sidebar-link link="/admin/card" icon="menu-button-fill" content="Card Home"></base-sidebar-link>
      </li>
      <li class="active">
        <base-sidebar-link link="/admin/production" icon="clipboard-check" content="Production"></base-sidebar-link>
      </li>
    </ul>
  </nav>
</template>
<script>
export default {
  name: "base-sidebar",
  props: {
    contentId: {
      type: [String, Number],
      default: `ID${Math.random().toString()}`,
    },
  },
  data() {
    return { toggled: false };
  },
  methods: {
    ClickEvent: function() {
      this.toggled = !this.toggled;
    },
    ClickOutSide: function() {
      this.$sidebar.displaySidebar(false);
    },
  },
};
</script>
<style scoped>
.wrapper {
  display: flex;
  align-items: stretch;
}
a,
a:hover,
a:focus {
  color: inherit;
  text-decoration: none;
  transition: all 0.3s;
}

.sidebar {
  z-index: 3;
  position: fixed;
  top: 0;
  left: 0;
  background: -webkit-gradient(
    linear,
    left bottom,
    left top,
    from(#389466),
    to(#42b883)
  );
  background: linear-gradient(0deg, #389466, #42b883);
  color: #fff;
  -webkit-transition: 0.5s cubic-bezier(0.685, 0.0473, 0.346, 1);
  transition: 0.5s cubic-bezier(0.685, 0.0473, 0.346, 1);
}
@media screen and (min-width: 992px) {
  .sidebar {
    width: 240px;
    height: calc(100vh - 90px);
    margin-top: 80px;
    margin-left: 20px;
    border-radius: 5px;
  }
}
@media screen and (max-width: 991px) {
  .sidebar {
    width: 260px;
    height: 100vh;
    -webkit-transform: translate3d(-260px, 0, 0);
    transform: translate3d(-260px, 0, 0);
  }
}

.sidebar .sidebar-header {
  padding: 20px;
  border-bottom: 1px solid #ffffff;
}
.sidebar .sidebar-header a{
  font-weight: 600;
}
.sidebar .sidebar-header svg {
  margin-right: 20px;
}

.sidebar ul.components {
  padding: 20px 0;
}
.sidebar ul li a {
  color: hsla(0, 0%, 100%, 0.8);
  padding: 20px;
  font-size: 0.75em;
  display: block;
  margin-left: 5px;
  line-height: 0.625rem;
  text-transform: uppercase;
  font-weight: 600;
  margin-right: 20px;
}

.sidebar ul li a>>>svg {
  margin-right: 20px;
}
.sidebar ul li a:hover {
  color: #fff;
}
</style>
