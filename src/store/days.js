import router from "@/router";
import { firestoreAction } from "vuexfire";
import db from "@/db";

export default {
  state: {
    days: [],
    day: {},
  },
  actions: {
    bindDays: firestoreAction(({ bindFirestoreRef, _, getters }) => {
      const cyclesIds = getters.cycles.map((cycle) => cycle.id);

      if (!cyclesIds.length) {
        return;
      }

      return bindFirestoreRef(
        "days",
        db
          .collection("days")
          .where("creatorId", "==", getters.getUserId)
          .where("cycle_id", "in", cyclesIds)
      );
    }),
    bindDay: firestoreAction(({ bindFirestoreRef }, dayId) => {
      return bindFirestoreRef(
        "day",
        db.collection("days").doc(dayId)
      ).then((day) => ({ ...day, date: day.date.toDate() }));
    }),
    async addDay({ commit, dispatch, getters }, payload) {
      // create a cycle if no cycles exist and the user is trying to add a day
      if (!getters.cycles.length) {
        dispatch("addCycle", true)
          .then(() => {
            commit("SET_CURRENT_CYCLE");
            dispatch("addDay", payload);
          })
          .catch((error) => {
            commit("SET_ERROR", error);
          });
        return;
      }

      // active cycle exist
      const dayRef = db.collection("days").doc();
      const day = {
        ...payload,
        id: dayRef.id,
        creatorId: getters.getUserId,
        cycle_id: getters.currentCycle.id,
      };

      dayRef.set(day).catch((error) => {
        commit("SET_ERROR", error);
      });

      router.push("/cycles");
    },
    editDay(_, payload) {
      db.collection("days")
        .doc(payload.id)
        .update(payload);
    },
    deleteDay({ commit }, payload) {
      return db
        .collection("days")
        .doc(payload)
        .delete()
        .catch((error) => commit("SET_ERROR", error));
    },
  },
  getters: {
    sortedDays(state) {
      const days = [
        ...state.days.map((day) => {
          return { ...day, date: day.date.toDate() };
        }),
      ];
      return days.sort((a, b) => a.date - b.date);
    },
    lastDayInCycle: (_, getters) => {
      if (!getters.currentCycle) {
        return undefined;
      }
      return getters.daysInCycle(getters.currentCycle.id).slice(-1)[0];
    },
    daysInCycle: (_, getters) => (id) => {
      return getters.sortedDays.filter((day) => day.cycle_id === id);
    },
  },
};
