import Vue from 'vue'
import router from '@/router'

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
            const book = {
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
                'comment': data.observation.comment
              }
            }
            days.push(book)
          })
          commit('SET_LOADED_DAYS', days);
        })
        .catch(error => {
          commit('SET_ERROR', error);
        })
    },
    addDay({commit, dispatch, getters}, payload) {
      const userId = getters.getUserId;

      //create a cycle and a day IF there is NO CYCLES
      if (!getters.cycles.length) {
        return new Promise((res) => {
          dispatch('addCycle')
          res();
        })
        .then(() => {
          let cycleId = null;
          Vue.$db.collection('cycles').where('creatorId', '==', userId).get()
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              //get id of created cycle
              cycleId = doc.data().id;
              //update current status
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
        return;
      }
      
      //test check is day already in cycle
      const daysInCycle = getters.days.filter(day => day.cycle_id == currentCycle.id);
      
      if(daysInCycle.length > 0) {
        let prevDayDate = new Date(daysInCycle[daysInCycle.length -1].date).getDate();
        let now = new Date().getDate();

        var missedDays = now - prevDayDate;
        const DAY_IN_MS = 86400000;
        
        if(prevDayDate === now) {
          const error = new Error('You can only create one card per day in cycle');
          commit('SET_ERROR', error);
          return
        }

        if(missedDays > 1) {
          for(let i = 0; i < missedDays - 1; i++) {
            const daysInCycle = getters.days.filter(day => day.cycle_id == currentCycle.id);
            let prevDay = new Date(daysInCycle[daysInCycle.length -1].date).getTime();
            
            //add empty day for every missed day
            let missedDay = {
              id: null,
              creatorId: getters.getUserId,
              cycle_id: currentCycle.id,
              date:  new Date(prevDay += DAY_IN_MS),
              observation: {}
            }
            
            const dayRef = Vue.$db.collection('days').doc(); 
            dayRef.set({...missedDay, id: dayRef.id})
            .then(() => {
              missedDay.id = dayRef.id;
              commit('ADD_DAY', missedDay);
            })
            .catch((error) => {
              commit('SET_ERROR', error);
            })
          }
        }
      }

      const day = {
        id: null,
        creatorId: getters.getUserId,
        cycle_id: currentCycle.id,
        date: new Date(),
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

      const dayRef = Vue.$db.collection('days').doc();
      dayRef.set({...day, id: dayRef.id})
      .then(() => {
        day.id = dayRef.id;
        commit('ADD_DAY', day);
      })
      .catch((error) => {
        commit('SET_ERROR', error);
      })
      //redirect
      router.push('/cycles')
    },
    editDay({commit,state}, payload) {
      Vue.$db.collection('days').doc(payload.id).update(payload)

      const currentDayIndex = state.days.findIndex(day => day.id == payload.id);
      const updatedDays = [...state.days.slice(0, currentDayIndex), payload, ...state.days.slice(currentDayIndex + 1, state.days.length)];
      commit('EDIT_DAY', updatedDays);
    }
  },
  getters: {
    days(state) {
      return state.days.sort(function(a,b){
        return new Date(a.date) - new Date(b.date);
      });
    },
    daysInCycle: state => id => {
      return state.days.filter(day => day.cycle_id === id);
    }
  }
}