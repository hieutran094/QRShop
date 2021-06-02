<template>
  <div>
    <div class="position-relative">
      <section class="section-shaped my-0">
        <div
          class="shape shape-style-2 shape-default shape-skew bg-gradient-default"
        >
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
        <div class="container shape-container d-flex">
          <div class="col px-0">
            <div class="row">
              <div class="col-lg-6">
                <h1 class="display-3 text-white">
                  A beautiful Design QRCode
                  <span>completed with examples</span>
                </h1>
                <p class="lead text-white">
                  The design system comes with four pre-built pages to help you
                  get started faster. You can change the text and images and
                  you're good to go.
                </p>
                <div class="btn-wrapper">
                  <base-button
                    tag="a"
                    href="#"
                    class="mb-3 mb-sm-0"
                    type="info"
                    icon="fa fa-code"
                  >
                    Components
                  </base-button>
                  <base-button
                    tag="a"
                    href="#"
                    class="mb-3 mb-sm-0"
                    type="white"
                    icon="ni ni-cloud-download-95"
                  >
                    Download HTML
                  </base-button>
                </div>
              </div>
              <div class="col-lg-6 d-flex justify-content-center">
                <img
                  v-lazy="'img/qr.svg'"
                  class="card-img"
                  style="height:200px;width:200px"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
    <section class="section section-lg pt-lg-0 mt--200">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-12">
            <div class="row row-grid">
              <div
                v-for="item in cards"
                :class="[`col-lg-${item.col}`]"
                :key="item._id"
              >
                <home-card :card="item"></home-card>
              </div>
              <!-- <div class="col-lg-4">
                <card class="border-0" hover shadow body-classes="py-5">
                  <icon
                    name="mdi mdi-qrcode"
                    type="primary"
                    rounded
                    class="mb-4 border-dark"
                  >
                  </icon>
                  <h6 class="text-primary text-uppercase">Normal QRCode</h6>
                  <p class="description mt-3">
                    Normal card with
                  </p>
                  <img v-lazy="'img/qr-code-card.png'" class="card-img" />
                  <div>
                    <badge type="primary" rounded>design</badge>
                    <badge type="primary" rounded>system</badge>
                    <badge type="primary" rounded>creative</badge>
                  </div>
                  <base-button tag="a" href="#" type="primary" class="mt-4">
                    Learn More
                  </base-button>
                </card>
              </div>
              <div class="col-lg-4">
                <card class="border-0" hover shadow body-classes="py-5">
                  <icon
                    name="mdi mdi-qrcode-scan"
                    type="success"
                    rounded
                    class="mb-4"
                  >
                  </icon>
                  <h6 class="text-success text-uppercase">QRCode circular</h6>
                  <p class="description mt-3">
                    Argon is a great free UI package based on Bootstrap 4 that
                    includes the most important components and features.
                  </p>
                  <div>
                    <badge type="success" rounded>business</badge>
                    <badge type="success" rounded>vision</badge>
                    <badge type="success" rounded>success</badge>
                  </div>
                  <base-button tag="a" href="#" type="success" class="mt-4">
                    Learn More
                  </base-button>
                </card>
              </div>
              <div class="col-lg-4">
                <card class="border-0" hover shadow body-classes="py-5">
                  <icon
                    name="mdi mdi-qrcode-edit"
                    type="warning"
                    rounded
                    class="mb-4"
                  >
                  </icon>
                  <h6 class="text-warning text-uppercase">Prepare Launch</h6>
                  <p class="description mt-3">
                    Argon is a great free UI package based on Bootstrap 4 that
                    includes the most important components and features.
                  </p>

                  <div>
                    <badge type="warning" rounded>marketing</badge>
                    <badge type="warning" rounded>product</badge>
                    <badge type="warning" rounded>launch</badge>
                  </div>
                  <base-button tag="a" href="#" type="warning" class="mt-4">
                    Learn More
                  </base-button>
                </card>
              </div> -->
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import HomeCard from "./miniComponents/HomeCard.vue";
export default {
  name: "home",
  components: {
    "home-card": HomeCard,
  },
  data() {
    return {
      cards: [],
    };
  },
  methods: {
    loadCard: async function() {
      // let result = await new Promise((resolve, reject) => {
      //     this.$client.CallFunction(
      //       "",
      //       "GetUserRole",
      //       urn ? { username: urn } : {},
      //       function(e) {
      //         if (e.Status == "Pass") resolve(e.Data);
      //         else reject(e.Message);
      //       }
      //     );
      //   });
      this.cards = [
        {
          header: "Hello",
          icon: "mdi mdi-qrcode",
          content: "Just Testing",
          hover: true,
          badge: ["sale", "qrcode"],
          type: "primary",
          url: "/",
          col: 4,
        },
        {
          header: "Hello",
          icon: "mdi mdi-qrcode",
          content: "Just Testing",
          hover: true,
          badge: ["sale", "qrcode"],
          type: "primary",
          url: "/",
          col: 4,
        },
        {
          header: "Hello",
          icon: "mdi mdi-qrcode",
          content: "Just Testing",
          hover: false,
          badge: ["sale", "qrcode", "sale", "qrcode", "sale", "qrcode"],
          type: "primary",
          url: "/",
          col: 4,
        },
      ];
    },
  },
  mounted: function() {
    this.loadCard();
  },
};
</script>
<style>
.section-shaped .shape.shape-skew + .container .col {
  margin-top: -100px;
}
@media (min-width: 992px) {
  .mt--200 {
    margin-top: -200px !important;
  }
}
@media (min-width: 992px) {
  .container {
    max-width: 1092px;
  }
}
</style>
