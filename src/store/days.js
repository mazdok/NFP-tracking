import Vue from 'vue'

export default {
  state: {
    days: []
  },
  mutations: {
    'SET_LOADED_BOOKS'(state, payload) {
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
    setLoadedBooks({commit,getters}) {
      const userId = getters.getUserId;

      Vue.$db.collection('books').where('creatorId', '==', userId).get().then(querySnapshot => {
          const books = []
          querySnapshot.forEach(doc => {
            const data = doc.data();
            const book = {
              'id': data.id,
              'creatorId': userId,
              'cycle_id': data.cycle_id,
              'date': data.date.seconds,
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
            books.push(book)
          })
          commit('SET_LOADED_BOOKS', books);
        })
        .catch(error => {
          console.log(error)
        })
    },
    addDay({
      commit,
      dispatch,
      getters
    }, payload) {

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
      if (!getters.cycles.length) {
        dispatch('addCycle');
        dispatch('setCurrentCycle', 0);
      }

      const currentCycle = getters.cycles.find(cycle => cycle.current);
      if (!currentCycle) {
        alert('Please select a current cycle first');
        return;
      }

      const day = {
        id: payload.id,
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
          comment: payload.observation.comment
        }
      }
      commit('ADD_DAY', day);
    },
    editDay({commit,state}, payload) {
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
      return state.days.filter(day => day.cycle_id === id);
    }
  }
}