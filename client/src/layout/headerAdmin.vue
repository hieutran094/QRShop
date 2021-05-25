<template>
  <header class="header-global">
    <base-nav
      class="navbar-main"
      transparent
      type="light"
      effect="light"
      expand
    >
      <router-link slot="brand" class="navbar-brand  mr-lg-5" to="/">
        <img
          src="../../public/logo/qr-code-logo.svg"
          width="30"
          height="30"
          alt=""
        />
      </router-link>
      <button-tonggle
        slot="tonggle-sidebar"
        class="innner-button"
        :toggled="$sidebar.showSidebar"
        :target="'contentId'"
        @click.native.stop="$sidebar.showSidebar = !$sidebar.showSidebar"
      >
        <div slot="icon">
          <span class="navbar-toggler-bar bar1"></span>
          <span class="navbar-toggler-bar bar2"></span>
          <span class="navbar-toggler-bar bar3"></span>
        </div>
      </button-tonggle>
      <div class="row" slot="content-header" slot-scope="{ closeMenu }">
        <div class="col-6 collapse-brand"></div>
        <div class="col-6 collapse-close">
          <close-button @click="closeMenu"></close-button>
        </div>
      </div>

      <ul class="navbar-nav align-items-lg-center ml-lg-auto">
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
        <li class="nav-item">
          <template>
            <v-container fluid style="">
              <v-row justify="center">
                <v-menu bottom rounded offset-y>
                  <template v-slot:activator="{ on }">
                    <v-btn icon x-medium v-on="on" outlined>
                      <v-avatar color="teal" size="30">
                        <span class="">HT</span>
                      </v-avatar>
                    </v-btn>
                  </template>
                  <v-card>
                    <v-list-item-content class="justify-center">
                      <div class="mx-auto text-center">
                        <v-avatar color="teal">
                          <span class="white--text headline">HT</span>
                        </v-avatar>
                        <h3>Tran Hieu</h3>
                        <p class="caption mt-1">
                          hieu@gmail.com
                        </p>
                        <v-divider class="my-3"></v-divider>
                        <v-btn depressed rounded text>
                          Edit Account
                        </v-btn>
                        <v-divider class="my-3"></v-divider>
                        <v-btn depressed rounded text>
                          Disconnect
                        </v-btn>
                      </div>
                    </v-list-item-content>
                  </v-card>
                </v-menu>
              </v-row>
            </v-container>
          </template>
        </li>
      </ul>
    </base-nav>
  </header>
</template>
<script>
export default {
  name: "headers",
  components: {},
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
  .navbar .navbar-brand {
    position: fixed;
    left: 30px;
    padding-top: 0.3125rem;
    padding-bottom: 0.3125rem;
    color: #fff;
    margin-left: 17px;
    margin-top: 3px;
    text-transform: uppercase;
    font-size: 1rem;
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
