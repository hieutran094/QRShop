<template>
  <div class="content">
    <v-app>
      <v-card elevation="2" outlined>
        <v-card-title> <h4>User Role</h4></v-card-title>
        <v-list-item three-line>
          <v-form onSubmit="return false;">
            <v-container>
              <v-row>
                <v-col cols="12" md="6">
                  <b-button-toolbar>
                    <b-button-group size="" class="mr-1">
                      <b-button
                        variant="outline-primary"
                        @click="showLayer('add')"
                        ><i class="mdi mdi-plus-thick" aria-hidden="true"></i
                        >Add</b-button
                      >
                      <b-button
                        variant="outline-primary"
                        :disabled="editActive"
                        @click="showLayer('edit')"
                        ><i class="mdi mdi-pencil" aria-hidden="true"></i
                        >Edit</b-button
                      >
                      <b-button
                        variant="outline-primary"
                        :disabled="deleteActive"
                        @click="deleteRole"
                        ><i
                          class="mdi mdi-delete-forever"
                          aria-hidden="true"
                        ></i
                        >Delete</b-button
                      >
                    </b-button-group>
                  </b-button-toolbar>
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="search"
                    append-icon="mdi-magnify"
                    label="Enter to search"
                    outlined
                    dense
                    hide-details
                    v-on:keyup.enter="searchUser"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row> </v-row>
            </v-container>
          </v-form>
        </v-list-item>
        <v-card-actions>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-data-table
                  checkbox-color="#000"
                  data-table-border-radius
                  v-model="selected"
                  :headers="headers"
                  :items="desserts"
                  :single-select="singleSelect"
                  item-key="_id"
                  show-select
                  class="elevation-1"
                  @click:row="selectRow"
                  elevation="5"
                >
                  <template #item.full_name="{ item }"
                    >{{ item.first_name }} {{ item.last_name }}</template
                  >
                  <template
                    v-for="header in headers.filter((header) =>
                      header.hasOwnProperty('formatter')
                    )"
                    v-slot:[`item.${header.value}`]="{ header, value }"
                  >
                    {{ header.formatter(value) }}
                  </template>
                  <template v-slot:item.role="{ item }">
                    <v-tooltip left>
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn
                          v-bind="attrs"
                          v-on="on"
                          color="warning"
                          x-small
                          fab
                          dark
                        >
                          <v-icon>mdi-account-circle</v-icon>
                        </v-btn>
                      </template>
                      <span>{{ showRole(item.role) }}</span>
                    </v-tooltip>
                    <!-- <v-chip :color="gren" dark>
                      {{ item.role }}
                    </v-chip> -->
                  </template>
                </v-data-table>
              </v-col>
            </v-row>
          </v-container>
        </v-card-actions>
      </v-card>
    </v-app>
  </div>
</template>
<script>
import CardLayer from "./Layers/CardLayer.vue";
export default {
  name: "role",
  data() {
    return {
      editActive: true,
      deleteActive: true,
      checkbox: true,
      singleSelect: false,
      selected: [],
      search: "",
      headers: [],
      desserts: [],
      iframeData: {
        user: [],
        isChange: false,
      },
    };
  },
  methods: {
    selectRow: function(item) {
      let add = true;
      for (let i = 0; i < this.selected.length; i++) {
        if (item._id == this.selected[i]._id) {
          this.selected.splice(i, 1);
          add = false;
          break;
        }
      }
      if (add) this.selected.push(item);
    },
    formatTime: function(item) {
      return new Date(item).toLocaleString();
    },
    formatPrivilege: function(item) {
      let lp = "";
      if (item.length > 0) {
        item.forEach((element) => {
          lp += `${element.privilege_name}/`;
        });
      }
      return lp == "" ? "N/A" : lp;
    },
    loadDataToTable: async function() {
      try {
        let result = await new Promise((resolve, reject) => {
          this.$client.CallFunction("CardManager", "GetCard", {}, function(e) {
            if (e.Status == "Pass") resolve(e.Data);
            else reject(e.Message);
          });
        });
        if (result.length > 0) {
          this.headers = [
            { text: "Header", value: "header" },
            { text: "Icon", value: "icon" },
            { text: "Hover", value: "hover" },
            { text: "Type", value: "type" },
            { text: "Link To", value: "url" },
            { text: "Col", value: "cold" },
            {
              text: "Edit Time",
              value: "edit_time",
              formatter: this.formatTime,
            },
          ];
          this.desserts = result;
        } else {
          throw new Error("Can't be found any card");
        }
      } catch (err) {
        this.$layer.msg(err);
      }
    },
    searchUser: async function() {
      this.loadDataToTable(this.search);
    },
    showRole: function(item) {
      let rl = "";
      if (item.length > 0) {
        item.forEach((element) => {
          rl += `${element.role_name}/`;
        });
      }
      return rl == "" ? "N/A" : rl;
    },
    showLayer: function(type) {
      let card = this.selected[0];
      this.iframeData.card = card;
      this.iframeData.type = type;
      this.iframeData.isChange = false;
      let title = type == `add` ? `Add new card` : `Edit card`;
      this.$layer.iframe({
        content: {
          content: CardLayer,
          parent: this,
          data: { iframeData: this.iframeData },
        },
        area: [this.$vuetify.breakpoint.xs ? "100%" : "auto", "100%"],
        scrollbar: true,
        title: title,
        maxmin: true,
        shade: true,
        shadeClose: false,
        cancel: () => {},
      });
    },
    deleteRole: async function() {
      let comfirm = {};
      try {
        let listID = [];
        for (let i = 0; i < this.selected.length; i++) {
          listID.push(this.selected[i]._id);
        }
        comfirm = await new Promise((resolve) => {
          this.$layer.confirm(
            `Are you sure to delete ${listID.length} record？`,
            {
              title: "Confirm delete",
              btn: ["Yes", "No"],
              icon: 3,
            },
            (layerid) => {
              resolve({ yes: true, layerID: layerid });
            },
            (layerid) => {
              resolve({ yes: false, layerID: layerid });
            }
          );
        });
        if (comfirm.yes) {
          let result = await new Promise((resolve, reject) => {
            this.$client.CallFunction(
              "RoleManager",
              "Delete",
              {
                id: listID,
              },
              function(e) {
                if (e.Status == "Pass") resolve(e);
                else reject(e.Message);
              }
            );
          });
          if (result) {
            this.$layer.msg(result.Message);
            this.loadDataToTable();
          }
        }
      } catch (err) {
        this.$layer.msg(err);
      } finally {
        this.$layer.close(comfirm.layerID);
      }
    },
  },
  mounted: async function() {
    this.loadDataToTable();
  },
  watch: {
    selected() {
      if (this.selected.length == 1) this.editActive = false;
      else this.editActive = true;
      if (this.selected.length > 0) this.deleteActive = false;
      else this.deleteActive = true;
    },
    "iframeData.isChange": {
      handler: function() {
        this.loadDataToTable();
        this.selected = [];
      },
      deep: true,
      immediate: false,
    },
  },
  computed: {},
};
</script>
<style>
.main-panel .content {
  padding: 80px 30px 30px 280px;
  min-height: calc(100vh - 70px);
}
.v-application {
  border-radius: 4px;
  background: transparent;
}
@media screen and (max-width: 991px) {
  .main-panel .content {
    padding-left: 30px;
  }
}
.v-menu {
  display: block;
}
.table-toolbar {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: flex-end;
  -ms-flex-align: flex-end;
  align-items: flex-end;
}
.v-data-table {
  border: 1px solid #dddddd;
}
</style>
