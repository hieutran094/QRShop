import Vue from 'vue';

export const store = Vue.observable({
  role: '',
  disallowedRoutes: []
});

export const mutations = {
  setRole(role) {
    store.role = role;
  },
  setDisallowedRoutes(routes) {
    store.disallowedRoutes = routes;
  }
};