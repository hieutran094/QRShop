<template>
  <section class="section section-shaped section-lg my-0">
    <div class="shape shape-style-1 bg-gradient-default">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
    <div class="container pt-lg-md">
      <div class="row justify-content-center">
        <div class="col-lg-5">
          <card
            type="light"
            shadow
            scare="mb-3"
            headerClasses="bg-white pb-5"
            bodyClasses="px-lg-5 py-lg-5"
            class="border-0"
          >
            <template>
              <div class="text-muted text-center mb-3">
                <small>Sign in with</small>
              </div>
              <div class="btn-wrapper text-center">
                <form>
                  <div class="form-group mx-sm-3 mb-2">
                    <base-button type="light" shadowSize="sm">
                      <img
                        slot="icon"
                        src="img/github.svg"
                        style="width: 20px"
                      />
                      Github
                    </base-button>
                    <base-button type="light" shadowSize="sm">
                      <img
                        slot="icon"
                        src="img/google.svg"
                        style="width: 20px"
                      />
                      Google
                    </base-button>
                  </div>
                </form>
              </div>
            </template>
            <template>
              <div class="text-center text-muted mb-4">
                <small>Or sign in with credentials</small>
              </div>
              <form role="form">
                <base-input
                  alternative
                  class="mb-3"
                  placeholder="Email"
                  addonLeftIcon="glyphicon glyphicon-envelope"
                >
                </base-input>
                <base-input
                  alternative
                  type="password"
                  placeholder="Password"
                  addonLeftIcon="ni ni-lock-circle-open"
                >
                </base-input>
                <base-checkbox> Remember me </base-checkbox>
                <div class="text-center">
                  <base-button type="primary" v-on:click="login" class="my-4"
                    >Sign In</base-button
                  >
                </div>
              </form>
            </template>
          </card>
          <div class="row mt-3">
            <div class="col-6">
              <a href="#" class="text-light">
                <small>Forgot password?</small>
              </a>
            </div>
            <div class="col-6 text-right">
              <a href="#" class="text-light">
                <small>Create new account</small>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  name: "login",
  components: {},
  methods: {
    callBack(e) {
      console.log(e);
    },
    login() {
      this.$client.Login("root@gmail.com", "000", this.callBack);
    },
  },
};
</script>
<style lang="scss" scoped>
.btn-primary {
  color: #fff;
  background-color: #5e72e4 !important;
  border-color: #5e72e4 !important;
}
</style>
