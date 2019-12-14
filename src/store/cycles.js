import Vue from "vue";
import sortArrayWithUndefined from '@/helpers/sortArray';

export default {
  state: {
    cycles: [],
    currentCycle: null
  },
  mutations: {
    SET_LOADED_CYCLES(state, payload) {
      state.cycles = payload;
    },
    ADD_CYCLE(state, payload) {
      state.cycles.unshift(payload);
    },
    DELETE_CYCLE(state, payload) {
      state.cycles = payload;
    },
    SET_CURRENT_CYCLE(state, payload) {
      state.cycles.forEach(cycle => {
        cycle.current = false;
      });
      state.cycles.find(cycle => cycle.id === payload).current = true;
    },
    RESIZE_CYCLE(state, payload) {
      let cycle = state.cycles.find(cycle => cycle.id === payload);
      cycle.squeezed = !cycle.squeezed;
    }
  },
  actions: {
    setLoadedCycles({ commit, getters }) {
      commit("SET_PROCESSING", true);
      const userId = getters.getUserId;

      Vue.$db
        .collection("cycles")
        .where("creatorId", "==", userId)
        .get()
        .then(querySnapshot => {
          const cycles = [];
          querySnapshot.forEach(doc => {
            const data = doc.data();
            const cycle = {
              id: doc.id,
              createdAt: data.createdAt,
              creatorId: userId,
              current: data.current,
              squeezed: data.squeezed
            };
            cycles.push(cycle);
          });
          commit("SET_LOADED_CYCLES", cycles);
          commit("SET_PROCESSING", false);
        })
        .catch(error => {
          commit("SET_ERROR", error);
          commit("SET_PROCESSING", false);
        });
    },
    addCycle({ commit, getters }) {
      const cycle = {
        id: null,
        createdAt: Date.now(),
        creatorId: getters.getUserId,
        current: false,
        squeezed: false
      };

      const ref = Vue.$db.collection("cycles").doc();
      //assign id of newly created doc to cycle
      ref
        .set({ ...cycle, id: ref.id })
        .then(() => {
          //update local cycle id and add it to UI
          cycle.id = ref.id;
          commit("ADD_CYCLE", cycle);
        })
        .catch(error => {
          commit("SET_ERROR", error);
        });
    },
    deleteCycle({ commit, state }, payload) {
      const cycles = state.cycles.filter(cycle => cycle.id != payload);

      Vue.$db
        .collection("cycles")
        .doc(payload)
        .delete()
        .catch(error => {
          commit("SET_ERROR", error);
        });

      //delete all days in cycle as well
      Vue.$db
        .collection("days")
        .where("cycle_id", "==", payload)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            doc.ref.delete();
          });
        })
        .catch(error => {
          commit("SET_ERROR", error);
        });
      commit("DELETE_CYCLE", cycles);
    },
    setCurrentCycle({ commit, getters }, payload) {
      const userId = getters.getUserId;

      Vue.$db
        .collection("cycles")
        .where("creatorId", "==", userId)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            doc.ref.update({
              current: false
            });
            if (doc.id === payload) {
              doc.ref.update({
                current: true
              });
            }
          });
        })
        .catch(error => {
          commit("SET_ERROR", error);
        });
      commit("SET_CURRENT_CYCLE", payload);
    },
    resizeCycle({ commit }, payload) {
      Vue.$db
        .collection("cycles")
        .doc(payload)
        .get()
        .then(snap => {
          let cycleSqueezed = snap.data().squeezed ? false : true;
          snap.ref.update({ squeezed: cycleSqueezed });
        })
        .catch(error => {
          commit("SET_ERROR", error);
        });
      commit("RESIZE_CYCLE", payload);
    }
  },
  getters: {
    cycles(state) {
      // sort cycles at DESC order
      return state.cycles.sort(sortArrayWithUndefined('DESC'));
    },
    currentCycle(state) {
      return state.cycles.find(cycle => cycle.current);
    }
  }
};
