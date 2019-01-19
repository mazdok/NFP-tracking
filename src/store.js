import Vue from 'vue'
import Vuex from 'vuex'
import userModule from './store/user'
import cyclesModule from './store/cycles'
import daysModule from './store/days'
import generalModule from './store/general'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    userModule,
    cyclesModule,
    daysModule,
    generalModule
  }
})
