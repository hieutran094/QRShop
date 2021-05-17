<template>
  <component
    class="dropdown"
    :is="tag"
    :class="[
      { show: isOpen },
      { dropdown: direction === 'down' },
      { dropup: direction === 'up' },
    ]"
    :aria-expanded="isOpen"
    @click="ClickEvent"
    v-click-outside="CloseItem"
  >
    <slot name="title"> </slot>
    <fade-transition origin="center" mode="out-in" :duration="550">
      <div
        class="dropdown-menu"
        aria-labelledby="dropdownMenuButton"
        :class="[{ show: isOpen }]"
      >
        <slot></slot>
      </div>
    </fade-transition>
  </component>
</template>
<script>
export default {
  name: "base-drop",
  components: {
  },
  props: {
    tag: { type: String, default: "li" },
    direction: { type: String, default: "down" },
  },
  methods: {
    ClickEvent: function() {
      this.isOpen = !this.isOpen;
    },
    CloseItem(){
      this.isOpen =false;
    }
  },
  data() {
    return { isOpen: false };
  },
};
</script>
<style scoped></style>
