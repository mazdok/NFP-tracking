import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import firebase from "firebase/app";
import "./registerServiceWorker";
// Third-party dependencies
import "./vendor";
// Global styles
import "./assets/styles/styles.scss";

Vue.config.productionTip = false;

var vue = null;
firebase.auth().onAuthStateChanged((user) => {
  store.dispatch("stateChanged", user);

  if (user) {
    // FIXME REFACTOR TO SPEND LESS READS
    store
      .dispatch("bindAccounts")
      .then(() => store.dispatch("setLoadedCycles"))
      .then(() => store.dispatch("bindDays"));
  }

  if (!vue) {
    vue = new Vue({
      router,
      store,
      render: (h) => h(App),
    }).$mount("#app");
  }
});
