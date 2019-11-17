import Vue from 'vue';
import Vuex from 'vuex';

import Person from "./Person";
import Pets from "./Pets";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    ...Person.state,
    ...Pets.state
  },
  getters: {
    ...Person.getters,
    ...Pets.getters
  },
  mutations: {
    ...Person.mutations,
    ...Pets.mutations
  },
  actions: {
    ...Person.actions,
    ...Pets.actions
  },
  modules: {
    ...Person.modules,
    ...Pets.modules
  },
});
