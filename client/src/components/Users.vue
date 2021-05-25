<template>
  <div class="content">
    <div class="row">
      <div class="col-12">
        <card
          type="light"
          shadow
          scare="mb-3"
          headerClasses="bg-white"
          bodyClasses="px-lg-5 py-lg-5"
          class="border-0"
        >
          <div slot="header">
            <h4>Users</h4>
          </div>
          <div class="row">
            <div class="col-md-6 col-sm-12 table-toolbar">
              <b-button-toolbar class="" aria-label="">
                <b-button-group size="" class="mr-1">
                  <b-button variant="outline-primary"><i class="mdi mdi-plus-thick" aria-hidden="true"></i>Add</b-button>
                  <b-button variant="outline-primary"><i class="mdi mdi-pencil" aria-hidden="true"></i>Edit</b-button>
                  <b-button variant="outline-primary"><i class="mdi mdi-delete-forever" aria-hidden="true"></i>Delete</b-button>
                </b-button-group>
              </b-button-toolbar>
            </div>
            <div class="col-md-6 col-sm-12 ">
              <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="Search"
                single-line
                hide-details
              ></v-text-field>
            </div>
            <div class="col-12">
              <!-- <b-table
                striped
                hover
                :items="items"
                :fields="fields"
                :select-mode="true"
                responsive="sm"
                ref="selectableTable"
                selectable
                @row-selected="onRowSelected"
              >
                <template #cell(selected)="{item}">
                  <b-form-checkbox
                    v-model="selected"
                    :value="item"
                    name="checkbox-1"
                    @click.stop.native="selectThisRow"
                  >
                  </b-form-checkbox>
                </template>
              </b-table> -->
              <v-data-table
                checkbox-color="#000"
                v-model="selected"
                :headers="headers"
                :items="desserts"
                :single-select="singleSelect"
                item-key="name"
                show-select
                :search="search"
                class="elevation-1"
              >
                <!-- <template v-slot:top>
                  <v-switch
                    v-model="singleSelect"
                    label="Single select"
                    class="pa-3"
                  ></v-switch>
                </template> -->
              </v-data-table>
            </div>
          </div>
        </card>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "home",
  // data() {
  //   return {
  //     modes: ["multi", "single", "range"],
  //     fields: ["selected", "isActive", "age", "first_name", "last_name"],
  //     items: [
  //       {
  //         isActive: true,
  //         age: 40,
  //         first_name: "Dickerson",
  //         last_name: "Macdonald",
  //       },
  //       { isActive: false, age: 21, first_name: "Larsen", last_name: "Shaw" },
  //       { isActive: false, age: 89, first_name: "Geneva", last_name: "Wilson" },
  //       { isActive: true, age: 38, first_name: "Jami", last_name: "Carney" },
  //     ],
  //     selectMode: "multi",
  //     selected: [],
  //   };
  // },
  data() {
    return {
      checkbox:true,
      singleSelect: false,
      selected: [],
      search: "",
      headers: [
        {
          text: "Dessert (100g serving)",
          align: "start",
          sortable: false,
          value: "name",
        },
        { text: "Calories", value: "calories" },
        { text: "Fat (g)", value: "fat" },
        { text: "Carbs (g)", value: "carbs" },
        { text: "Protein (g)", value: "protein" },
        { text: "Iron (%)", value: "iron" },
      ],
      desserts: [
        {
          name: "Frozen Yogurt",
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
          iron: "1%",
        },
        {
          name: "Ice cream sandwich",
          calories: 237,
          fat: 9.0,
          carbs: 37,
          protein: 4.3,
          iron: "1%",
        },
        {
          name: "Eclair",
          calories: 262,
          fat: 16.0,
          carbs: 23,
          protein: 6.0,
          iron: "7%",
        },
        {
          name: "Cupcake",
          calories: 305,
          fat: 3.7,
          carbs: 67,
          protein: 4.3,
          iron: "8%",
        },
        {
          name: "Gingerbread",
          calories: 356,
          fat: 16.0,
          carbs: 49,
          protein: 3.9,
          iron: "16%",
        },
        {
          name: "Jelly bean",
          calories: 375,
          fat: 0.0,
          carbs: 94,
          protein: 0.0,
          iron: "0%",
        },
        {
          name: "Lollipop",
          calories: 392,
          fat: 0.2,
          carbs: 98,
          protein: 0,
          iron: "2%",
        },
        {
          name: "Honeycomb",
          calories: 408,
          fat: 3.2,
          carbs: 87,
          protein: 6.5,
          iron: "45%",
        },
        {
          name: "Donut",
          calories: 452,
          fat: 25.0,
          carbs: 51,
          protein: 4.9,
          iron: "22%",
        },
        {
          name: "KitKat",
          calories: 518,
          fat: 26.0,
          carbs: 65,
          protein: 7,
          iron: "6%",
        },
      ],
    };
  },
  methods: {
    onRowSelected(items) {
      this.selected = items;
      console.log(this.selected);
    },
    selectThisRow() {
      console.log(event.target.parentElement); //.target.parentElement
      //console.log(this);
      // this.$refs.selectableTable.selectRow(2)
    },
  },
};
</script>
<style>
.main-panel .content {
  padding: 80px 30px 30px 280px;
  min-height: calc(100vh - 70px);
}
@media screen and (max-width: 991px) {
  .main-panel .content {
    padding-left: 30px;
  }
}
/*
table {
  color: #fff;
}*/
/* .table {
  box-shadow: 5px 5px 5px darkgray;
  border-radius: 5px;
}  */
/* 
.table thead {
  background-color: #0e9aa7;
}
*/
.table-toolbar {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: flex-end;
  -ms-flex-align: flex-end;
  align-items: flex-end;
}
</style>
