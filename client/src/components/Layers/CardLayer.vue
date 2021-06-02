<template>
  <div style="">
    <v-app>
      <v-card class="mx-auto" outlined>
        <v-card-title> </v-card-title>
        <v-list-item three-line>
          <v-container>
            <v-row>
              <v-col cols="12" md="6">
                <v-form>
                  <v-text-field
                    v-model="form[`header`]"
                    label="Header"
                    outlined
                    dense
                    required
                  ></v-text-field>
                  <v-textarea
                    outlined
                    name="input-7-4"
                    label="Content"
                    v-mode="form.content"
                    :value="form.content"
                    @input="updateTextAres"
                  ></v-textarea>
                  <!-- </v-col> -->
                  <!-- <v-col cols="12" md="6"> -->
                  <v-text-field
                    v-model="form.url"
                    label="URL"
                    outlined
                    dense
                  ></v-text-field>
                  <!-- </v-col> -->
                  <!-- <v-col cols="12"> -->
                  <v-autocomplete
                    v-model="form.type"
                    :items="items"
                    :menu-props="{
                      closeOnClick: true,
                      closeOnContentClick: true,
                    }"
                    outlined
                    dense
                    chips
                    small-chips
                    label="Type"
                  ></v-autocomplete>
                  <v-row>
                    <v-col cols="12" md="6">
                      <v-checkbox
                        v-model="form.hover"
                        label="Hover"
                      ></v-checkbox>
                    </v-col>
                    <v-col cols="12" md="6">
                      <v-autocomplete
                        v-model="form.col"
                        :items="[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]"
                        :menu-props="{
                          closeOnClick: true,
                          closeOnContentClick: true,
                        }"
                        outlined
                        dense
                        label="Col"
                      ></v-autocomplete>
                    </v-col>
                  </v-row>
                </v-form>
              </v-col>
              <v-col cols="12" md="6">
                <v-card elevation="2" outlined>
                  <v-card-title>Preview</v-card-title>

                  <v-card-actions>
                    <home-card :card="form"></home-card>
                  </v-card-actions>
                </v-card>
              </v-col>
            </v-row>
          </v-container>
        </v-list-item>
      </v-card>
    </v-app>
  </div>
</template>
<script>
import HomeCard from ".././miniComponents/HomeCard.vue";
export default {
  components: {
    "home-card": HomeCard,
  },
  data() {
    return {
      headers: [], //data header for table
      desserts: [], //data show on table
      selected: [], //data selected from table
      search: "",
      deleteActive: true,
      items: ["primary", "success", "warning"], //data for autocomplete
      value: "primary", //data selected from autocomplete
      loading: false,
      //header:"OK",
      form: {
        header: "TEST",
        content: "just for testting. Please add content inside here",
        icon: "mdi mdi-qrcode",
        badge: [],
        hover: true,
        type: "primary",
        url: "/",
        col: 4,
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
        this.header = this.iframeData.card.header;
        this.content = this.iframeData.card.content;
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
    updateTextAres:function(value){
        this.form.content=value;
    },
    cancel() {
      this.$layer.z(this.layerid);
    },
    quxiao() {
      this.$layer.close(this.layerid);
    },
  },
  mounted: async function() {
    // try {
    //   let result = await new Promise((resolve, reject) => {
    //     this.$client.CallFunction("PrivilegeManager", "GetAll", {}, function(
    //       e
    //     ) {
    //       if (e.Status == "Pass") resolve(e.Data);
    //       else reject(e.Message);
    //     });
    //   });
    //   if (result.length > 0) {
    //     this.headers = [
    //       { text: "Privilege Name", value: "privilege_name" },
    //       { text: "Describe", value: "privilege_desc" },
    //       { text: "Target Url", value: "url" },
    //       { text: "Edit Time", value: "edit_time", formatter: this.formatTime },
    //     ];
    //     //this.items = result;
    //     //this.init();
    //   }
    // } catch (err) {
    //   this.$layer.msg(err);
    // }
  },
  watch: {
    iframeData: {
      handler: function() {
        this.form = this.iframeData;
      },
      deep: true,
      immediate: false,
    },
    selected: {
      handler: function() {
        if (this.selected.length > 0) this.deleteActive = false;
        else this.deleteActive = true;
      },
      deep: true,
      immediate: true,
    },
    // values: {
    //   handler: function() {
    //     this.changeTableData();
    //   },
    //   deep: true,
    //   immediate: true,
    // },
    // form:{
    //     handler: function(old,newval ) {
    //     console.log(newval)
    //   },
    //   deep: true,
    // }
  },
};
</script>
<style></style>
