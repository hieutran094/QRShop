<template>
  <nav class="sidebar" :class="[{ active: toggled }]" id="contentId">
    <div class="sidebar-header">
      <h3>Bootstrap Sidebar</h3>
    </div>

    <ul class="list-unstyled components">
      <p>Dummy Heading</p>
      <li class="active">
        <a
          href="#homeSubmenu"
          data-toggle="collapse"
          aria-expanded="false"
          class="dropdown-toggle"
          >Home</a
        >
        <ul class="collapse list-unstyled" id="homeSubmenu">
          <li>
            <a href="#">Home 1</a>
          </li>
          <li>
            <a href="#">Home 2</a>
          </li>
          <li>
            <a href="#">Home 3</a>
          </li>
        </ul>
      </li>
      <li>
        <a href="#">About</a>
      </li>
      <li>
        <a
          href="#pageSubmenu"
          data-toggle="collapse"
          aria-expanded="false"
          class="dropdown-toggle"
          >Pages</a
        >
        <ul class="collapse list-unstyled" id="pageSubmenu">
          <li>
            <a href="#">Page 1</a>
          </li>
          <li>
            <a href="#">Page 2</a>
          </li>
          <li>
            <a href="#">Page 3</a>
          </li>
        </ul>
      </li>
      <li>
        <a href="#">Portfolio</a>
      </li>
      <li>
        <a href="#">Contact</a>
      </li>
    </ul>
  </nav>
  <!-- <div id="content" class="main-panel">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
        <button-tonggle
          :toggled="toggled"
          :target="contentId"
          @click.native.stop="ClickEvent"
        >
        </button-tonggle>
      </div>
    </nav>
  </div> -->
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
      console.log("OK");
    },
  },
};
</script>
<style scoped>
.wrapper {
  display: flex;
  align-items: stretch;
}
.sidebar.active {
  margin-left: -250px;
}
a[data-toggle="collapse"] {
  position: relative;
}

.dropdown-toggle::after {
  display: block;
  position: absolute;
  top: 50%;
  right: 20px;
  transform: translateY(-50%);
}
@import "https://fonts.googleapis.com/css?family=Poppins:300,400,500,600,700";

body {
  font-family: "Poppins", sans-serif;
  background: #fafafa;
}

p {
  font-family: "Poppins", sans-serif;
  font-size: 1.1em;
  font-weight: 300;
  line-height: 1.7em;
  color: #999;
}

a,
a:hover,
a:focus {
  color: inherit;
  text-decoration: none;
  transition: all 0.3s;
}

/* .sidebar {
  background: #7386d5;
  color: #fff;
  transition: all 0.3s;
} */

.sidebar {
  width: 230px;
  position: fixed;
  top: 0;
  left: 0;
  /* height: 100vh; */
  height: calc(100vh - 90px);
  background: #7386d5;
  color: #fff;
  transition: all 0.3s;
  margin-top: 80px;
  margin-left: 20px;
  border-radius: 5px;
}
@media screen and (max-width: 991px) {
  .main-panel {
    right: 0;
    -webkit-transform: translate3d(260px, 0, 0);
    transform: translate3d(260px, 0, 0);
  }
}
.sidebar .sidebar-header {
  padding: 20px;
  background: #6d7fcc;
}

.sidebar ul.components {
  padding: 20px 0;
  border-bottom: 1px solid #47748b;
}

.sidebar ul p {
  color: #fff;
  padding: 10px;
}

.sidebar ul li a {
  padding: 10px;
  font-size: 1.1em;
  display: block;
}
.sidebar ul li a:hover {
  color: #7386d5;
  background: #fff;
}

.sidebar ul li.active > a,
a[aria-expanded="true"] {
  color: #fff;
  background: #6d7fcc;
}
ul ul a {
  font-size: 0.9em !important;
  padding-left: 30px !important;
  background: #6d7fcc;
}
</style>
