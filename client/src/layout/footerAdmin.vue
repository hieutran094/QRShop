<template>
  <footer class="footer has-cards">
    <div class="container">
      <div class="row align-items-center justify-content-md-between">
        <div class="col-md-6">
          <div class="copyright">
            &copy; {{ year }}
            <a href="#" target="_blank" rel="noopener"
              >Creative Anh with <b-icon icon="heart-fill"></b-icon
            ></a>
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
  name: "footers",
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
  font-size: 0.75rem;
  line-height: 1.8;
  color: #fff;
}
.mt-md,
.my-md {
  margin-top: 4rem !important;
}
.footer .copyright {
  font-size: 0.75rem;
  line-height: 1.8;
  color: #fff;
}
</style>
