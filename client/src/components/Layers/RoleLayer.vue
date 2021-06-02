<template>
  <div style="">
    <v-app>
      <v-card class="mx-auto" outlined>
        <v-card-title> </v-card-title>
        <v-list-item three-line>
          <v-form>
            <v-container>
              <v-row>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="role_name"
                    label="Name"
                    outlined
                    dense
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="role_describe"
                    label="Describe"
                    outlined
                    dense
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-autocomplete
                    v-model="values"
                    :items="items"
                    :menu-props="{
                      closeOnClick: true,
                      closeOnContentClick: true,
                    }"
                    item-text="privilege_name"
                    item-value="_id"
                    outlined
                    dense
                    chips
                    small-chips
                    label="Privilege"
                    multiple
                  ></v-autocomplete>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" md="6">
                  <b-button-toolbar class="" aria-label="">
                    <b-button-group size="" class="mr-1">
                      <b-button
                        variant="outline-primary"
                        :disabled="deleteActive"
                        @click="deletePrivilege"
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
                    append-icon="mdi-magnify"
                    label="Search"
                    outlined
                    dense
                    hide-details
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </v-list-item>
        <v-card-actions>
          <v-container>
            <v-row>
              <v-col cols="12" md="12">
                <v-data-table
                  v-model="selected"
                  :headers="headers"
                  :items="desserts"
                  :single-select="false"
                  item-key="_id"
                  show-select
                  :search="search"
                  class="elevation-1"
                  @click:row="selectRow"
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
              <v-col cols="6" md="6">
                <v-btn
                  :loading="loading"
                  :disabled="loading"
                  outlined
                  color="success"
                  class="ma-2 white--text"
                  @click="saveRole"
                >
                  <v-icon left dark>
                    mdi-arrow-down-thick
                  </v-icon>
                  Save
                </v-btn>

                <v-btn
                  outlined
                  color="blue-grey"
                  class="ma-2 white--text"
                  @click="cancel"
                >
                  <v-icon left dark>
                    mdi-close
                  </v-icon>
                  cancel
                </v-btn>
              </v-col>
            </v-row>
          </v-container>
        </v-card-actions>
      </v-card>
    </v-app>
  </div>
</template>
<script>
export default {
  data() {
    return {
      headers: [], //data header for table
      desserts: [], //data show on table
      selected: [], //data selected from table
      search: "",
      deleteActive: true,
      items: [], //data for autocomplete
      values: [], //data selected from autocomplete
      role_name: "",
      role_describe: "",
      loading: false,
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
      },
    };
  },
  props: {
    layerid: {
      type: String,
      default: "",
    },
    iframeData: {
      type: Object,
      default: () => {
        return {};
      },
    },
    lydata: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  methods: {
    /**
     * init fist data when open layer
     */
    init: function() {
      if (this.iframeData.type == `edit`) {
        this.role_name = this.iframeData.role.role_name;
        this.role_describe = this.iframeData.role.role_describe;
        let array = [];
        for (let i = 0; i < this.iframeData.role.privilege.length; i++) {
          array.push(this.iframeData.role.privilege[i]._id);
        }
        this.values = array;
      }
    },
    /**
     * change table data when autocomplete select
     * or follow data pass from role.vue page
     */
    changeTableData: function() {
      let arr = [];
      for (let i = 0; i < this.values.length; i++) {
        for (let j = 0; j < this.items.length; j++) {
          if (this.items[j]._id == this.values[i]) arr.push(this.items[j]);
        }
      }
      this.desserts = arr;
    },
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
    deletePrivilege: function() {
      for (let i = 0; i < this.selected.length; i++) {
        for (let j = 0; j < this.values.length; j++) {
          if (this.values[j] == this.selected[i]._id) {
            this.values.splice(j, 1);
          }
        }
      }
      this.selected = [];
    },
    saveRole: async function() {
      try {
        if (this.role_name == "") {
          throw new Error("Role name can't be null");
        }
        this.loading = true;
        let result = await new Promise((resolve, reject) => {
          this.$client.CallFunction(
            "RoleManager",
            this.iframeData.type == `edit` ? "Update" : "Insert",
            this.iframeData.type == `edit`
              ? {
                  id: this.iframeData.role._id,
                  new: {
                    role_name: this.role_name,
                    role_describe: this.role_describe,
                    privilege: this.values,
                  },
                }
              : {
                  role_name: this.role_name,
                  role_describe: this.role_describe,
                  privilege: this.values,
                },
            function(e) {
              if (e.Status == "Pass") resolve(e);
              else reject(e.Message);
            }
          );
        });
        if (result) {
          this.$parent.$data.iframeData.isChange = true;
          this.$layer.msg(result.Message);
          this.$layer.close(this.layerid);
        }
      } catch (err) {
        console.log(err);
        this.$layer.msg(err);
      } finally {
        this.loading = false;
      }
    },
    cancel() {
      this.$layer.close(this.layerid);
    },
    quxiao() {
      this.$layer.close(this.layerid);
    },
  },
  mounted: async function() {
    try {
      let result = await new Promise((resolve, reject) => {
        this.$client.CallFunction("PrivilegeManager", "GetAll", {}, function(
          e
        ) {
          if (e.Status == "Pass") resolve(e.Data);
          else reject(e.Message);
        });
      });
      if (result.length > 0) {
        this.headers = [
          { text: "Privilege Name", value: "privilege_name" },
          { text: "Describe", value: "privilege_desc" },
          { text: "Target Url", value: "url" },
          { text: "Edit Time", value: "edit_time", formatter: this.formatTime },
        ];
        this.items = result;
        this.init();
      }
    } catch (err) {
      this.$layer.msg(err);
    }
  },
  watch: {
    iframeData: {
      handler: function() {
        this.form = this.iframeData;
      },
      deep: true,
      immediate: true,
    },
    selected: {
      handler: function() {
        if (this.selected.length > 0) this.deleteActive = false;
        else this.deleteActive = true;
      },
      deep: true,
      immediate: true,
    },
    values: {
      handler: function() {
        this.changeTableData();
      },
      deep: true,
      immediate: true,
    },
  },
};
</script>
<style></style>
