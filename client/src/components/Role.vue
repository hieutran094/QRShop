<template>
  <div class="content">
    <v-app>
      <v-card elevation="2" outlined>
        <v-card-title> <h4>Role Manager</h4></v-card-title>
        <v-list-item three-line>
          <v-form>
            <v-container>
              <v-row>
                <v-col cols="12" md="6">
                  <b-button-toolbar class="" aria-label="">
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
                    label="Search"
                    outlined
                    dense
                    hide-details
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
              <v-col cols="12" md="12">
                <v-data-table
                  checkbox-color="#000"
                  data-table-border-radius
                  v-model="selected"
                  :headers="headers"
                  :items="desserts"
                  :single-select="singleSelect"
                  item-key="_id"
                  show-select
                  :search="search"
                  class="elevation-1"
                  @click:row="selectRow"
                  elevation="5"
                >
                  <template
                    v-for="header in headers.filter((header) =>
                      header.hasOwnProperty('formatter')
                    )"
                    v-slot:[`item.${header.value}`]="{ header, value }"
                  >
                    {{ header.formatter(value) }}
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
import RoleLayer from "./RoleLayer.vue";
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
        role: [],
        type: "",
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
    showLayer: function(type) {
      let role = this.selected[0];
      this.iframeData.role = role;
      this.iframeData.type = type;
      let title =
        type == `add` ? `Add new role` : `Edit ${role.role_name} role`;
      this.$layer.iframe({
        content: {
          content: RoleLayer,
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
      try {
        console.log(this.selected)
        let listID=[];
        for(let i=0;i<this.selected.length;i++){
          listID.push(this.selected[i]._id)
        }
        let result = await new Promise((resolve, reject) => {
          this.$client.CallFunction(
            "RoleManager",
            "Delete",
            {
              id: listID
            },
            function(e) {
              if (e.Status == "Pass") resolve(e);
              else reject(e.Message);
            }
          );
        });
        if (result) {
          this.$layer.msg(result.Message);
        }
      } catch (err) {
        this.$layer.msg(err);
      }
    },
  },
  mounted: async function() {
    try {
      let result = await new Promise((resolve, reject) => {
        this.$client.CallFunction("RoleManager", "GetAllRole", {}, function(e) {
          if (e.Status == "Pass") resolve(e.Data);
          else reject(e.Message);
        });
      });
      if (result.length > 0) {
        this.headers = [
          { text: "Role Name", value: "role_name" },
          { text: "Role Describe", value: "role_describe" },
          {
            text: "Privilege",
            value: "privilege",
            formatter: this.formatPrivilege,
          },
          { text: "Edit Time", value: "edit_time", formatter: this.formatTime },
        ];
        this.desserts = result;
      }
    } catch (err) {
      this.$swal.fire(
        {
          icon: "error",
          text: err,
        },
        function() {}
      );
    }
  },
  watch: {
    selected() {
      if (this.selected.length == 1) this.editActive = false;
      else this.editActive = true;
      if (this.selected.length > 0) this.deleteActive = false;
      else this.deleteActive = true;
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

/* .v-data-table td,th{
    border-right: 1px solid #dddddd;
} */
</style>
