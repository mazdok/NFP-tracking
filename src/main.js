import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./registerServiceWorker";
// Third-party dependencies
import "./vendor";
// Global styles
import "./assets/styles/styles.scss";
// Firebase
import firebase from "firebase/app";
import "firebase/firestore";
import firebaseConfig from "./config/firebase";

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
db.settings({});
Vue.$db = db;

Vue.config.productionTip = false;

var vue = null;
firebase.auth().onAuthStateChanged((user) => {
  // auto login and logout user on state change
  store.dispatch("stateChanged", user);
  if (user) {
    store.dispatch("setLoadedCycles");
    store.dispatch("setLoadedDays");
  }

  if (!vue) {
    vue = new Vue({
      router,
      store,
      render: (h) => h(App),
    }).$mount("#app");
  }
});
