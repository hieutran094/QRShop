<template>
  <div class="content">
    <div class="container">
      <div class="row">
        <div class="col">
          <div class="btn-group">
            <button
              class="btn btn-default btn-sm dropdown-toggle"
              type="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              :class="[
                { show: isOpen },
                { dropdown: direction === 'down' },
                { dropup: direction === 'up' },
              ]"
              :aria-expanded="isOpen"
              @click="ClickEvent"
              v-click-outside="CloseItem"
            >
              Icon <i class="mdi  mdi-alpha-l-circle"></i>
            </button>
            <ul
              class="dropdown-menu shadow p-3 mb-5 bg-white rounded"
              :class="[{ show: isOpen }]"
              v-on:click.stop
            >
              <nav aria-label="Page navigation example">
                <ul class="pagination d-flex justify-content-between">
                  <li
                    class="page-item"
                    @click="back"
                    :class="[{ disabled: backDisabled }]"
                  >
                    <a class="page-link" type="button">
                      <span aria-hidden="true">&laquo;</span></a
                    >
                  </li>
                  <li class="page-item">
                    <div class="form-group" style="padding:0 0.35em 0 0.35em">
                      <input
                        type="text"
                        class="form-control input-sm"
                        v-model="keyword"
                        placeholder="Search"
                      />
                    </div>
                  </li>
                  <li
                    class="page-item"
                    @click="next"
                    :class="[{ disabled: nextDisabled }]"
                  >
                    <a class="page-link" type="button"
                      ><span aria-hidden="true">&raquo;</span></a
                    >
                  </li>
                </ul>
              </nav>
              <table class="table  table-borderless">
                <tbody id="tbBody"></tbody>
              </table>
              <div class="d-flex justify-content-center">
                <span class="pagination-info">
                  Showing
                  {{
                    filtered.length > index * 16
                      ? index * 16 - 16
                      : index * 16 - 16
                  }}
                  to
                  {{
                    filtered.length > index * 16 ? index * 16 : filtered.length
                  }}
                  of {{ filtered.length }}
                </span>
              </div>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { ListIcon } from "./listIcon.js";
export default {
  props: {
    direction: { type: String, default: "down" },
  },
  data() {
    return {
      icon: ListIcon, //all icon
      index: 0, //index of pagination
      maxIndex: 0, //max of pagination
      nextDisabled: true, //is disable next button
      backDisabled: true, //is disable back button
      filtered: [], //list filter when search. default = all icon
      available: [], //list icon showing
      isOpen: false, //is menu picker show?
      keyword: "", //search key
    };
  },
  mounted: function() {
    this.filtered = this.icon; //fist time this.filtered = this.icon(default)
  },
  methods: {
    /**
     * filter condisition
     */
    isLike: function(value) {
      return value.includes(this.keyword);
    },
    /**
     * searching
     */
    search: async function() {
      if (this.keyword != null && this.keyword != "")
        this.filtered = this.icon.filter(this.isLike);
      else this.filtered = this.icon;
    },
    /**
     * event when click next pagination
     */
    next: function() {
      this.index += this.maxIndex > this.index ? 1 : 0;
    },
    /**
     * event when click back pagination
     */
    back: function() {
      this.index -= this.index > 1 ? 1 : 0;
    },
    ClickEvent: function() {
      this.isOpen = !this.isOpen;
    },
    CloseItem() {
      this.isOpen = false;
    },
    randomID: function(item) {
      return `ID${item}${parseInt(Math.random() * 99).toString()}`;
    },
    /**
     * init or reload table show icon
     */
    initTable: async function() {
      let length = this.available.length;
      let tb = document.getElementById("tbBody");
      tb.innerHTML = "";
      console.log(length);
      let tr = "";
      let j = 0;
      let i = 0;
      while (i < 4) {
        if (i == 0) tr = "<tr>";
        if (j < length) {
          tr += `<td>
                    <button type="button" class="btn btn-outline-primary">
                        <i class="mdi  ${this.available[j]}"></i>
                      </button>
                </td>`;
        } else {
          tr += "</tr>";
          tb.innerHTML += tr;
          break;
        }
        if (i == 3) {
          tr += "</tr>";
          tb.innerHTML += tr;
          i = 0;
        } else i++;
        j++;
      }
    },
  },
  watch: {
    /**
     * listen search (change filtered )
     */
    keyword: {
      handler: function() {
        this.search();
      },
      deep: true,
      immediate: false,
    },
    /**
     * calculator list icon show when change index pagination
     * and compare is disable next or back pagination
     */
    index: {
      handler: function() {
        let endLength = this.index * 16;
        this.available = this.filtered.slice(endLength - 16, endLength);
        this.nextDisabled = this.index < this.maxIndex ? false : true;
        this.backDisabled = this.index > 1 ? false : true;
      },
      deep: true,
      immediate: false,
    },
    /**
     * listen when maxIndex pagination then compare is disable next or not?
     */
    maxIndex: {
      handler: function() {
        this.nextDisabled = this.index < this.maxIndex ? false : true;
      },
      deep: true,
      immediate: false,
    },
    /**
     * listen list filter change. If change re calculator maxIndex and set index is 1
     * and showtable are 16 icon fist in list filtered
     */
    filtered: {
      handler: function() {
        let length = this.filtered.length;
        if (length > 0) {
          this.available =
            length > 15 ? this.filtered.slice(0, 16) : this.filtered;
        } else this.available = [];
        if (length <= 16) this.maxIndex = 1;
        else if (this.filtered.length % 16 == 0)
          this.maxIndex = this.filtered.length / 16;
        else
          this.maxIndex = Math.floor(parseInt(this.filtered.length) / 16) + 1;
        this.index = 1;
      },
      deep: true,
      immediate: false,
    },
    /**
     * reload table when list available show change
     */
    available: {
      handler: function() {
        this.initTable();
      },
      deep: true,
      immediate: false,
    },
  },
};
</script>
<style>
.table th,
.table td {
  padding: 0.25rem;
}
.has-search .form-control-feedback {
  right: initial;
  left: 0;
  color: #ccc;
}

.has-search .form-control {
  padding-right: 12px;
  padding-left: 34px;
}
.disabled {
  pointer-events: none;
}
.pagination-info {
  font-size: 0.75em;
  font-weight: 600;
  color: #4c5761;
}
</style>
