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
            <h4>Role Manager</h4>
          </div>
          <div class="row">
            <div class="col-md-6 col-sm-12 table-toolbar">
              <b-button-toolbar class="" aria-label="">
                <b-button-group size="" class="mr-1">
                  <b-button variant="outline-primary"
                    ><i class="mdi mdi-plus-thick" aria-hidden="true"></i
                    >Add</b-button
                  >
                  <b-button variant="outline-primary"
                    ><i class="mdi mdi-pencil" aria-hidden="true"></i
                    >Edit</b-button
                  >
                  <b-button variant="outline-primary"
                    ><i class="mdi mdi-delete-forever" aria-hidden="true"></i
                    >Delete</b-button
                  >
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
                <template v-slot:item.privilege="{ item }">
                  <b-button variant="outline-primary" @click="createPacks(item)"
                    ><i class="mdi mdi-plus-thick" aria-hidden="true"></i
                    >Add</b-button
                  >
                </template>
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
  name: "role",
  data() {
    return {
      checkbox: true,
      singleSelect: false,
      selected: [],
      search: "",
      headers: [],
      desserts: [],
    };
  },
  methods: {},
  mounted: async function() {
    let result = await new Promise((resolve, reject) => {
      this.$client.CallFunction("RoleManager", "GetAllRole", {}, function(e) {
        if (e.Status == "Pass") resolve(e.Data);
        else reject(e.Message);
      });
    });
    if (result.length > 0) {
      this.headers = [
        {
          text: "ID",
          align: "start",
          sortable: false,
          value: "_id",
        },
        { text: "Role Name", value: "role_name" },
        { text: "Role Describe", value: "role_describe" },
        { text: "Edit Time", value: "edit_time" },
        { text: "Privilege", value: "privilege" },
      ];
      this.desserts = result;
    }
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
