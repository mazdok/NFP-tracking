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
        state.cycles.find(cycle => cycle.id === payload).current = true;
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
        
       Vue.$db.collection('cycles').where('creatorId', '==', userId)
       .get()
       .then(querySnapshot => {
          const cycles = []
          querySnapshot.forEach(doc => {
            const data = doc.data();
            const cycle = {
              'id': doc.id,
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

       Vue.$db.collection('cycles').add(cycle).then((data) => {
        })
        .catch((error) => {
          console.log(error)
        })
        commit('ADD_CYCLE', cycle);
      },
      deleteCycle({commit, state}, payload) {
        const cycles = state.cycles.filter(cycle => cycle.id != payload);
        
        Vue.$db.collection('cycles').doc(payload).delete()
        .catch(error => console.log(error))
        
        //delete all days in cycle as well
        Vue.$db.collection('days')
        .where('cycle_id', '==', payload)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            doc.ref.delete()
          })
        })
        commit('DELETE_CYCLE', cycles);
      },
      setCurrentCycle({commit}, payload) {
      
       Vue.$db.collection('cycles').get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            doc.ref.update({
              current: false
            })
            if(doc.id === payload) {
              doc.ref.update({
                current: true
              })
            }
          })
        })
        commit('SET_CURRENT_CYCLE', payload);
      },
      resizeCycle({commit}, payload) {
       
        Vue.$db.collection('cycles').doc(payload).get()
        .then(snap => {
          let cycleSqueezed = snap.data().squeezed ? false : true;
          snap.ref.update({squeezed: cycleSqueezed})
        })
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