import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Element from 'element-ui'
import ElementUI from 'element-ui'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faBars, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import './registerServiceWorker'
import './styles.scss'
import firebase from 'firebase/app'
import 'firebase/firestore'
import firebaseConfig from './config/firebase'
import VueScrollTo from 'vue-scrollto';

//refactor here
Vue.use(VueScrollTo, {
  container: "body",
  duration: 500,
  easing: "ease",
  offset: 0,
  force: true,
  cancelable: true,
  onStart: false,
  onDone: false,
  onCancel: false,
  x: false,
  y: true
})
Vue.use(require('vue-moment'));
Vue.use(ElementUI)
Vue.use(Element)
library.add([faBars, faSignOutAlt])
Vue.component('font-awesome-icon', FontAwesomeIcon)

const firebaseApp = firebase.initializeApp(firebaseConfig)

const db = firebaseApp.firestore()
db.settings({
  timestampsInSnapshots: true
})

//test it. allows use data offline
// db.enablePersistence();
Vue.$db = db
Vue.config.productionTip = false

var vue = null;

firebase.auth().onAuthStateChanged(user => {
  //auto login and logout user on state change
  store.dispatch('stateChanged', user)
  if(user) {
    store.dispatch('setLoadedCycles');
    store.dispatch('setLoadedDays');
  }
  
  if (!vue) {
    vue = new Vue({
      router,
      store,
      render: h => h(App),
      // created() {
        // if (user) {
          // store.dispatch('setLoadedCycles');
          // store.dispatch('setLoadedDays');
        // }
      // },
    }).$mount('#app')
  }
})