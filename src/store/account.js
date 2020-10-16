import { firestoreAction } from "vuexfire";
import Vue from "vue";

export default {
  state: {
    account: {},
  },
  actions: {
    bindAccounts: firestoreAction(({ bindFirestoreRef, _, getters }) => {
      return bindFirestoreRef(
        "account",
        Vue.$db.collection("accounts").doc(getters.getUserId)
      );
    }),
    editAccount({ _, getters }, payload) {
      Vue.$db
        .collection("accounts")
        .doc(getters.getUserId)
        .set(payload);
    },
  },
};
