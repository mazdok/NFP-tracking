import Vue from 'vue'
import router from '@/router'
import scrollToTop from '@/helpers/scrollToTop'

export default {
  state: {
    days: []
  },
  mutations: {
    'SET_LOADED_DAYS'(state, payload) {
      state.days = payload;
    },
    'ADD_DAY'(state, payload) {
      state.days.push(payload);
    },
    'EDIT_DAY'(state, payload) {
      state.days = payload;
    },
    'DELETE_DAY'(state, payload) {
      state.days = payload;
    }
  },
  actions: {
    setLoadedDays({commit,getters}) {
      const userId = getters.getUserId;

     Vue.$db.collection('days').where('creatorId', '==', userId).get()
     .then(querySnapshot => {
          const days = []
          querySnapshot.forEach(doc => {
            const data = doc.data();
            const day = {
              'id': doc.id,
              'creatorId': userId,
              'cycle_id': data.cycle_id,
              'date': data.date.toDate(),
              'observation': {
                'mark': data.observation.mark,
                'menstrual': data.observation.menstrual,
                'indicator': data.observation.indicator,
                'color': data.observation.color,
                'sensation': data.observation.sensation,
                'frequency': data.observation.frequency,
                'peak': data.observation.peak,
                'dayCount': data.observation.dayCount,
                'intercourse': data.observation.intercourse,
                'comment': data.observation.comment,
                'sex': data.observation.sex
              }
            }
            days.push(day)
          })
          //sort days by date
          const sortedDays = days.sort(function(a,b){
            return a.date - b.date;
          });
          commit('SET_LOADED_DAYS', sortedDays);
        })
        .catch(error => {
          commit('SET_ERROR', error);
        })
    },
    addDay({commit, dispatch, getters}, payload) {
      const userId = getters.getUserId;

      //create a cycle and a day IF there is NO CYCLES
      if (!getters.cycles.length) {
        return new Promise((resolve) => {
          dispatch('addCycle')
          resolve();
        })
        .then(() => {
          let cycleId = null;
          Vue.$db.collection('cycles').where('creatorId', '==', userId).get()
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              //get id of created cycle
              cycleId = doc.data().id;
              doc.ref.update({
                current: true
              })
            })
          })
          .then(async () => {
            await commit('SET_CURRENT_CYCLE', cycleId);
            dispatch('addDay', payload)
          })
          .catch(error => {
            commit('SET_ERROR', error);
          })
        })
        .catch(error => {
          commit('SET_ERROR', error);
        }) 
      }

      const currentCycle = getters.cycles.find(cycle => cycle.current);
      
      if (!currentCycle) {
        const error = new Error('Please select a current cycle first');
        commit('SET_ERROR', error);
        scrollToTop();
        return;
      }

      const day = {
        id: null,
        creatorId: getters.getUserId,
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
          comment: payload.observation.comment,
          sex: payload.observation.sex
        }
      }

      const dayRef = Vue.$db.collection('days').doc();
      dayRef.set({...day, id: dayRef.id})
      .then(() => {
        day.id = dayRef.id;
        commit('ADD_DAY', day);
      })
      .catch((error) => {
        commit('SET_ERROR', error);
      })
      router.push('/cycles')
    },
    editDay({commit,state}, payload) {
      Vue.$db.collection('days').doc(payload.id).update(payload)

      const currentDayIndex = state.days.findIndex(day => day.id == payload.id);
      const updatedDays = [...state.days.slice(0, currentDayIndex), payload, ...state.days.slice(currentDayIndex + 1, state.days.length)];
      commit('EDIT_DAY', updatedDays);
    },
    deleteDay({commit, getters}, payload) {
      const updatedDays = getters.days.filter((day) => day.id != payload)

      Vue.$db.collection('days').doc(payload).delete()
      .then(() => {
        commit('DELETE_DAY', updatedDays)
      })
      .then(() => {
        router.push('/cycles')
      })
      .catch(error => commit('SET_ERROR', error))
    }
  },
  getters: {
    days(state) {
      return state.days
    },
    daysInCycle: state => id => {
      return state.days.filter(day => day.cycle_id === id);
    }
  }
}