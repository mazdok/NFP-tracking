import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Element from 'element-ui'
import ElementUI from 'element-ui'
import './registerServiceWorker'
import './styles.scss'
import firebase from 'firebase/app'
import 'firebase/firestore'
import firebaseConfig from './config/firebase'

Vue.use(require('vue-moment'));
Vue.use(ElementUI)
Vue.use(Element)

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

  // console.log('State changed', user)
  // console.log('isUserAuth', store.getters.isUserAuthenticated)
  
  if (!vue) {
    vue = new Vue({
      router,
      store,
      render: h => h(App),
      created() {
        if (user) {
          store.dispatch('setLoadedCycles');
          store.dispatch('setLoadedDays');
        }
      },
    }).$mount('#app')
  }
})