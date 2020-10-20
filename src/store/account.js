import { firestoreAction } from "vuexfire";
import db from "@/db";

export default {
  state: {
    account: {},
  },
  actions: {
    bindAccounts: firestoreAction(({ bindFirestoreRef, _, getters }) => {
      return bindFirestoreRef(
        "account",
        db.collection("accounts").doc(getters.getUserId)
      );
    }),
    editAccount({ _, getters, commit }, payload) {
      db.collection("accounts")
        .doc(getters.getUserId)
        .set(payload);

      commit("SET_SHOULD_UPDATE_STATE", true);
    },
  },
  getters: {
    isCervix: (state) => state.account?.observations?.cervix,
    numOfCyclesToShow: (state) => state.account?.numOfCycles || 3,
  },
};
