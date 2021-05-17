<template>
  <footer class="footer has-cards">
    <div class="container container-lg">
      <div class="row">
        <div class="col-md-6 mb-5 mb-md-0">
          <div class="card card-lift--hover shadow border-0">
            <router-link to="/landing" title="Landing Page">
              <img v-lazy="'img/qr-code-card.png'" class="card-img" />
            </router-link>
          </div>
        </div>
        <div class="col-md-6 mb-5 mb-lg-0">
          <div class="card card-lift--hover shadow border-0">
            <router-link to="/profile" title="Profile Page">
              <img v-lazy="'img/theme/profile.jpg'" class="card-img" />
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="row row-grid align-items-center my-md">
        <div class="col-lg-6">
          <h3 class="text-primary font-weight-light mb-2">
            Thank you for supporting us!
          </h3>
          <h4 class="mb-0 font-weight-light">
            Let's get in touch on any of these platforms.
          </h4>
        </div>
        <div class="col-lg-6 text-lg-center btn-wrapper">
          <a
            target="_blank"
            rel="noopener"
            href="https://instagram.com"
            class="btn btn-neutral btn-icon-only btn-twitter btn-round btn-lg"
            data-toggle="tooltip"
            data-original-title="Follow us"
          >
            <b-icon icon="instagram"></b-icon>
          </a>
          <a
            target="_blank"
            rel="noopener"
            href="https://www.facebook.com"
            class="btn btn-neutral btn-icon-only btn-facebook btn-round btn-lg"
            data-toggle="tooltip"
            data-original-title="Like us"
          >
            <b-icon icon="facebook"></b-icon>
          </a>
        </div>
      </div>
      <hr />
      <div class="row align-items-center justify-content-md-between">
        <div class="col-md-6">
          <div class="copyright">
            &copy; {{ year }}
            <a href="#" target="_blank" rel="noopener">Creative Anh with <b-icon icon="heart-fill"></b-icon></a>
          </div>
        </div>
        <div class="col-md-6">
          <ul class="nav nav-footer justify-content-end">
            <li class="nav-item">
              <a href="#" class="nav-link" target="_blank" rel="noopener"
                >Creative Anh</a
              >
            </li>
            <li class="nav-item">
              <a href="#" class="nav-link" target="_blank" rel="noopener"
                >About Me</a
              >
            </li>
            <li class="nav-item">
              <a href="#" class="nav-link" target="_blank" rel="noopener"
                >Blog</a
              >
            </li>
          </ul>
        </div>
      </div>
    </div>
  </footer>
</template>
<script>
export default {
  name: "footer",
  data() {
    return { year: new Date().getFullYear() };
  },
};
</script>
<style lang="scss" scoped>

.text-primary {
  color: #5e72e4 !important;
}
a {
  color: #5e72e4;
  text-decoration: none;
  background-color: transparent;
  -webkit-text-decoration-skip: objects;
}
.footer .nav .nav-item .nav-link {
  color: #8898aa !important;
}
.footer {
  background: #f4f5f7;
  padding: 3rem 0;
}
.footer.has-cards {
  overflow: hidden;
  padding-top: 500px;
  margin-top: -420px;
  position: relative;
  pointer-events: none;
  z-index: -2;
  background-image: linear-gradient(220deg, rgb(255, 255, 255) 50%, rgb(248, 248, 248) 50%)  !important;
}
.mt-md, .my-md {
    margin-top: 4rem!important;
}
</style>
