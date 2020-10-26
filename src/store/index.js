import Vue from "vue";
import Vuex from "vuex";
import { vuexfireMutations } from "vuexfire";

import userModule from "./user";
import cyclesModule from "./cycles";
import daysModule from "./days";
import generalModule from "./general";
import accountModule from "./account";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    userModule,
    cyclesModule,
    daysModule,
    generalModule,
    accountModule,
  },
  mutations: {
    ...vuexfireMutations,
  },
});
