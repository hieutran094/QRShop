<template>
  <header class="header-global">
    <base-nav class="navbar-main" transparent type="light" effect="light" expand>
      <router-link slot="brand" class="navbar-brand  mr-lg-5" to="/">
        <img
          src="../../public/logo/qr-code-logo.svg"
          width="30"
          height="30"
          alt=""
        />
      </router-link>

      <div class="row" slot="content-header" slot-scope="{ closeMenu }">
        <div class="col-6 collapse-brand"></div>
        <div class="col-6 collapse-close">
          <close-button @click="closeMenu"></close-button>
        </div>
      </div>

      <ul
        class="navbar-nav navbar-nav-hover align-items-lg-center "
        aria-labelledby="dropdownMenu1"
      >
        <router-link to="/" class="nav-link">Home</router-link>
        <base-drop class="nav-item ">
          <a
            slot="title"
            class="nav-link"
            data-toggle="dropdown"
            aria-haspopup="true"
            href="#"
          >
            Components
          </a>
          <div>
            <router-link to="/login" class="dropdown-item">Login</router-link>
            <router-link to="/sigup" class="dropdown-item">Sigup</router-link>
          </div>
        </base-drop>
        <!-- <base-dropdown class="nav-item" menu-classes="dropdown-menu-xl">
                    <a slot="title" href="#" class="nav-link" data-toggle="dropdown" role="button">
                        <i class="ni ni-ui-04 d-lg-none"></i>
                        <span class="nav-link-inner--text">Components</span>
                    </a>
                    <div class="dropdown-menu-inner">
                        <a href="https://demos.creative-tim.com/vue-argon-design-system/documentation/"
                           class="media d-flex align-items-center">
                            <div class="icon icon-shape bg-gradient-primary rounded-circle text-white">
                                <i class="ni ni-spaceship"></i>
                            </div>
                            <div class="media-body ml-3">
                                <h6 class="heading text-primary mb-md-1">Getting started</h6>
                                <p class="description d-none d-md-inline-block mb-0">Get started with Bootstrap, the
                                    world's most popular framework for building responsive sites.</p>
                            </div>
                        </a>
                        <a href="https://demos.creative-tim.com/vue-argon-design-system/documentation/"
                           class="media d-flex align-items-center">
                            <div class="icon icon-shape bg-gradient-warning rounded-circle text-white">
                                <i class="ni ni-ui-04"></i>
                            </div>
                            <div class="media-body ml-3">
                                <h5 class="heading text-warning mb-md-1">Components</h5>
                                <p class="description d-none d-md-inline-block mb-0">Learn how to use Argon
                                    compiling Scss, change brand colors and more.</p>
                            </div>
                        </a>
                    </div>
                </base-dropdown>
                <base-dropdown tag="li" class="nav-item">
                    <a slot="title" href="#" class="nav-link" data-toggle="dropdown" role="button">
                        <i class="ni ni-collection d-lg-none"></i>
                        <span class="nav-link-inner--text">Examples</span>
                    </a>
                    <router-link to="/landing" class="dropdown-item">Landing</router-link>
                    <router-link to="/profile" class="dropdown-item">Profile</router-link>
                    <router-link to="/login" class="dropdown-item">Login</router-link>
                    <router-link to="/register" class="dropdown-item">Register</router-link>
                </base-dropdown> -->
      </ul>
      <ul class="navbar-nav align-items-lg-center ml-lg-auto">
        <li class="nav-item">
          <a
            class="nav-link nav-link-icon"
            href="https://www.facebook.com/"
            target="_blank"
            rel="noopener"
            data-toggle="tooltip"
            title="Like us on Facebook"
          >
            <b-icon icon="facebook"></b-icon>
            <span class="nav-link-inner--text d-lg-none"> Facebook</span>
          </a>
        </li>
        <li class="nav-item">
          <a
            class="nav-link nav-link-icon"
            href="https://www.instagram.com/"
            target="_blank"
            rel="noopener"
            data-toggle="tooltip"
            title="Follow us on Instagram"
          >
            <b-icon icon="instagram"></b-icon>
            <span class="nav-link-inner--text d-lg-none"> Instagram</span>
          </a>
        </li>
        <li class="nav-item">
          <a
            class="nav-link nav-link-icon"
            href="https://twitter.com/"
            target="_blank"
            rel="noopener"
            data-toggle="tooltip"
            title="Follow us on Twitter"
          >
            <b-icon icon="twitter"></b-icon>
            <span class="nav-link-inner--text d-lg-none"> Twitter</span>
          </a>
        </li>

        <!-- <li class="nav-item d-none d-lg-block ml-lg-4">
          <a
            href="#"
            target="_blank"
            rel="noopener"
            class="btn btn-light btn-icon"
          >
            <span class="btn-inner">
              <b-icon icon="cloud-download"></b-icon>
            </span>
            <span class="nav-link-inner--text"> Download</span>
          </a>
        </li> -->
      </ul>
    </base-nav>
  </header>
</template>
<script>

export default {
  components: {
  },
  methods: {},
};
</script>
<style lang="scss" scoped>
@media (min-width: 992px) {
  .navbar-expand-lg .navbar-nav .nav-link {
    padding-right: 1rem;
    padding-left: 1rem;
    transition: all 0.15s linear;
  }
  .navbar-light .navbar-nav .nav-link:hover,
  .navbar-light .navbar-nav .nav-link:focus {
    color: hsla(0, 0%, 100%, 0.65) !important;
  }
  .navbar-light .navbar-nav .show > .nav-link,
  .navbar-light .navbar-nav .active > .nav-link,
  .navbar-light .navbar-nav .nav-link.show,
  .navbar-light .navbar-nav .nav-link.active {
    color: hsla(0, 0%, 100%, 0.65) !important;
  }
}
@media screen and (max-width: 991.98px) {
  .navbar-collapse .collapse-close {
    text-align: right;
  }
}
</style>
