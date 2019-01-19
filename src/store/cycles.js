import Vue from 'vue'

export default {
    state: {
      cycles: [],
      currentCycle: null
    },
    mutations: {
      'SET_LOADED_CYCLES'(state, payload) {
        state.cycles = payload;
      },
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
      'RESIZE_CYCLE'(state, payload) {
        let cycle = state.cycles.find((cycle) => cycle.id === payload);
        cycle.squeezed = !cycle.squeezed;
      }
    },
    actions: {
      setLoadedCycles({commit, getters}) {
        commit('SET_PROCESSING', true);
        const userId = getters.getUserId;
        
        Vue.$db.collection('cycles').where('creatorId', '==', userId).get().then(querySnapshot => {
          const cycles = []
          querySnapshot.forEach(doc => {
            const data = doc.data();
            const cycle = {
              'id': data.id,
              'creatorId': userId,
              'current': data.current,
              'squeezed': data.squeezed
            }
            cycles.push(cycle)
          })
          commit('SET_LOADED_CYCLES', cycles);
          commit('SET_PROCESSING', false);
        })
        .catch(error => {
          console.log(error)
          commit('SET_PROCESSING', false);
        })
      },
      addCycle({commit, getters}) {
        const cycle = {
          id: Math.random().toString(36).replace(/[^a-z]+/g, '').substr(2, 10),
          creatorId: getters.getUserId,
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
      resizeCycle({commit}, payload) {
        commit('RESIZE_CYCLE', payload);
      }
    },
    getters: {
      cycles(state) {
        return state.cycles
      },
      currentCycle(state) {
        return state.cycles.find(cycle => cycle.current);
      }
    }
  }