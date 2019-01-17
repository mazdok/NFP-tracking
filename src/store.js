import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cycles: [
      {
        id: 1,
        current: true,
        squeezed: true
      },
      {
        id: 2,
        current: false,
        squeezed: false
      }
    ],
    days: [
      {
        id: 1,
        cycle_id: 1,
        date: '12.01.2019',
        observation: {
          mark: 'red',
          menstrual: 'VL',
          indicator: null,
          color: 'B',
          sensation: null,
          frequency: 'AD',
          peak: false,
          dayCount: 0,
          intercourse: false,
          comment: 'Lorem ipsum dolor ...'
        }
      },
      {
        id: 2,
        cycle_id: 1,
        date: '13.01.2019',
        observation: {
          mark: 'green',
          menstrual: null,
          indicator: '10WL',
          color: 'CK',
          sensation: 'G',
          frequency: 'AD',
          peak: true,
          dayCount: 0,
          intercourse: true,
          comment: ''
        }
      },
      {
        id: 3,
        cycle_id: 2,
        date: '14.01.2019',
        observation: {
          mark: 'lightgreen',
          menstrual: null,
          indicator: '2',
          color: 'P',
          sensation: 'L',
          frequency: 'AD',
          peak: false,
          dayCount: 0,
          intercourse: true,
          comment: ''
        }
      },
      {
        id: 4,
        cycle_id: 2,
        date: '15.01.2019',
        observation: {
          mark: 'white',
          menstrual: null,
          indicator: '2',
          color: 'P',
          sensation: 'L',
          frequency: 'AD',
          peak: false,
          dayCount: 0,
          intercourse: true,
          comment: 'Lorem ipsum dolor4 ...'
        }
      }
    ],
    currentCycle: null
  },
  mutations: {
    'ADD_CYCLE'(state, payload) {
      state.cycles.unshift(payload);
    },
    'DELETE_CYCLE'(state, payload) {
      state.cycles = payload;
    },
    'SET_CURRENT_CYCLE'(state, payload) {
      state.cycles.forEach((cycle) => {
        cycle.current = false;
      })
      state.cycles[payload].current = true;
    }, 
    'ADD_DAY'(state, payload) {
      state.days.push(payload);
    },
    'EDIT_DAY'(state, payload) {
      state.days = payload;
    },
    'RESIZE_DAYS'(state, payload) {
      let cycle = state.cycles.find((cycle) => cycle.id === payload);
      cycle.squeezed = !cycle.squeezed;
    }
  },
  actions: {
    addCycle({commit}) {
      const cycle = {
        id: Math.random().toString(36).replace(/[^a-z]+/g, '').substr(2, 10),
        current: false,
        squeezed: false
      }
      commit('ADD_CYCLE', cycle);
    },
    deleteCycle({commit, state}, payload) {
      const cycles = state.cycles.filter(cycle => cycle.id != payload);
      commit('DELETE_CYCLE', cycles);
    },
    setCurrentCycle({commit}, payload) {
      commit('SET_CURRENT_CYCLE', payload);
    },
    addDay({commit, state, dispatch}, payload) {
      //test check is date is already in cycle
      // const daysInCycle = state.days.filter(day => day.cycle_id == currentCycle.id);
      // if(daysInCycle.length > 0) {
      //   const isDayRepeat = daysInCycle[daysInCycle.length -1].date.isSameOrAfter(payload.date, 'day');
      //   if(isDayRepeat) {
      //     console.error('You already created day')
      //     return
      //   }
      // }
      
      //check
      if(!state.cycles.length) {
        dispatch('addCycle');
        dispatch('setCurrentCycle', 0);
      }

      const currentCycle = state.cycles.find(cycle => cycle.current);
      if(!currentCycle) {
        alert('Please select a current cycle first');
        return;
      }
      
      const day = {
        id: payload.id,
        cycle_id: currentCycle.id,
        date: payload.date,
        observation: {
          mark: payload.observation.mark,
          menstrual: payload.observation.menstrual,
          indicator: payload.observation.indicator,
          color: payload.observation.color,
          sensation: payload.observation.sensation,
          frequency: payload.observation.frequency,
          peak: payload.observation.peak,
          dayCount: payload.observation.dayCount,
          intercourse: payload.observation.intercourse,
          comment: payload.observation.comment
        }
      }
      commit('ADD_DAY', day);
    },
    editDay({commit, state}, payload) {
      const currentDayIndex = state.days.findIndex(day => day.id == payload.id);
      const updatedDays = [ ...state.days.slice(0, currentDayIndex), payload, ...state.days.slice(currentDayIndex + 1, state.days.length)];

      commit('EDIT_DAY', updatedDays);
    },
    resizeDays({commit}, payload) {
      commit('RESIZE_DAYS', payload);
    }
  },
  getters: {
    cycles(state) {
      return state.cycles
    },
    currentCycle(state) {
      return state.cycles.find(cycle => cycle.current);
    },
    days(state) {
      return state.days
    },
    daysInCycle: state => id => {
      // return state.todos.find(todo => todo.id === id);
      return state.days.filter(day => day.cycle_id === id);
    }
  }
})
