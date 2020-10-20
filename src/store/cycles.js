import db from "@/db";

export default {
  state: {
    cycles: [],
    currentCycle: null,
    shouldUpdateState: false,
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
    SET_CURRENT_CYCLE(state, cycleId) {
      if (!cycleId) {
        state.cycles[0].current = true;
        return;
      }

      state.cycles.forEach((cycle) => {
        cycle.current = false;
      });
      state.cycles.find((cycle) => cycle.id === cycleId).current = true;
    },
    RESIZE_CYCLE(state, payload) {
      let cycle = state.cycles.find((cycle) => cycle.id === payload);
      cycle.squeezed = !cycle.squeezed;
    },
    SET_SHOULD_UPDATE_STATE(state, payload) {
      state.shouldUpdateState = payload;
    },
  },
  actions: {
    setLoadedCycles({ commit, getters }) {
      commit("SET_PROCESSING", true);
      const userId = getters.getUserId;

      return db
        .collection("cycles")
        .where("creatorId", "==", userId)
        .orderBy("createdAt", "desc")
        .limit(getters.numOfCyclesToShow)
        .get()
        .then((querySnapshot) => {
          const cycles = [];
          querySnapshot.forEach((doc) => {
            const data = doc.data();
            const cycle = {
              id: doc.id,
              createdAt: data.createdAt,
              creatorId: userId,
              current: data.current,
              squeezed: data.squeezed,
            };
            cycles.push(cycle);
          });
          commit("SET_LOADED_CYCLES", cycles);
          commit("SET_PROCESSING", false);
          return cycles;
        })
        .catch((error) => {
          commit("SET_ERROR", error);
          commit("SET_PROCESSING", false);
        });
    },
    async addCycle({ commit, getters, dispatch }, current = false) {
      const cycle = {
        id: null,
        createdAt: Date.now(),
        creatorId: getters.getUserId,
        current: current,
        squeezed: false,
      };

      const ref = db.collection("cycles").doc();
      // assign id of newly created doc to cycle
      return ref
        .set({ ...cycle, id: ref.id })
        .then(() => {
          // update local cycle id and add it to UI
          cycle.id = ref.id;
          commit("ADD_CYCLE", cycle);

          // update days reference
          // FIXME Review if needed
          dispatch("bindDays");
        })
        .catch((error) => {
          commit("SET_ERROR", error);
        });
    },
    deleteCycle({ commit, state, dispatch, getters }, payload) {
      const cycles = state.cycles.filter((cycle) => cycle.id != payload);

      db.collection("cycles")
        .doc(payload)
        .delete()
        .then(() => {
          commit("DELETE_CYCLE", cycles);

          if (cycles.length && !getters.currentCycle) {
            dispatch("setCurrentCycle", cycles[0].id);
          }
        })
        .catch((error) => {
          commit("SET_ERROR", error);
        });

      // delete all days in cycle as well
      db.collection("days")
        .where("cycle_id", "==", payload)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            doc.ref.delete();
          });

          // update days reference
          // FIXME Review if needed
          dispatch("bindDays");
        })
        .catch((error) => {
          commit("SET_ERROR", error);
        });
    },
    // FIXME Optimize number of reads
    setCurrentCycle({ commit, getters }, cycleId) {
      const userId = getters.getUserId;

      db.collection("cycles")
        .where("creatorId", "==", userId)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            doc.ref.update({
              current: false,
            });
            if (doc.id === cycleId) {
              doc.ref.update({
                current: true,
              });
            }
          });
        })
        .catch((error) => {
          commit("SET_ERROR", error);
        });
      commit("SET_CURRENT_CYCLE", cycleId);
    },
    resizeCycle({ commit }, payload) {
      db.collection("cycles")
        .doc(payload)
        .get()
        .then((snap) => {
          let cycleSqueezed = snap.data().squeezed ? false : true;
          snap.ref.update({ squeezed: cycleSqueezed });
        })
        .catch((error) => {
          commit("SET_ERROR", error);
        });
      commit("RESIZE_CYCLE", payload);
    },
  },
  getters: {
    cycles(state) {
      return state.cycles.sort((a, b) => b.createdAt - a.createdAt);
    },
    currentCycle(state) {
      return state.cycles.find((cycle) => cycle.current);
    },
  },
};
