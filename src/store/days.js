import Vue from 'vue'

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
              // 'id': data.id,
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
          console.log(error)
        })
    },
    addDay({commit, dispatch, getters}, payload) {
      //check
      if (!getters.cycles.length) {
        dispatch('addCycle');
        dispatch('setCurrentCycle', 0);
      }

      //tes
      // if (!currentCycle) {
      //   alert('Please select a current cycle first');
      //   return;
      // }

      const currentCycle = getters.cycles.find(cycle => cycle.current);
      
      //test check is date is already in cycle
      const daysInCycle = getters.days.filter(day => day.cycle_id == currentCycle.id);

      if(daysInCycle.length > 0) {
        let prevDayDate = new Date(daysInCycle[daysInCycle.length -1].date).getDate();
        let now = new Date().getDate();

        var missedDays = now - prevDayDate;
        const dayInMs = 86400000;
        
        if(prevDayDate >= now - 1) {
          console.error('You already created day')
          return
        }

        for(let i = 0; i < missedDays - 1; i++) {
          const daysInCycle = getters.days.filter(day => day.cycle_id == currentCycle.id);
          let prevDay = new Date(daysInCycle[daysInCycle.length -1].date).getTime()

          let missedDay = {
            id: Math.random().toString(36).replace(/[^a-z]+/g, '').substr(2, 10),
            creatorId: getters.getUserId,
            cycle_id: currentCycle.id,
            date:  new Date(prevDay += dayInMs),
            observation: {}
          }
          
          Vue.$db.collection('days').add(missedDay)
          .catch((error) => {
            console.log(error)
          })

          commit('ADD_DAY', missedDay);
        }
      }

      const day = {
        id: payload.id,
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

      Vue.$db.collection('days').add(day)
      .catch((error) => {
        console.error(error)
      })

      commit('ADD_DAY', day);
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
      return state.days
    },
    daysInCycle: state => id => {
      const days = state.days.filter(day => day.cycle_id === id);
      
      return days.sort(function(a,b){
        return new Date(a.date) - new Date(b.date);
      });
    }
  }
}