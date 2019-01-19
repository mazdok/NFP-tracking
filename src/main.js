import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Element from 'element-ui'
import ElementUI from 'element-ui'
import './registerServiceWorker'
import './styles.scss'
import firebaseConfig from './config/firebase'
import firebase from 'firebase/app'
import 'firebase/firestore'

Vue.use(require('vue-moment'));
Vue.use(ElementUI)
Vue.use(Element)

const firebaseApp = firebase.initializeApp(firebaseConfig)
const db = firebaseApp.firestore()
db.settings({
  timestampsInSnapshots: true
})

Vue.$db = db

Vue.config.productionTip = false

let app;
firebase.auth().onAuthStateChanged(function(user) {
  new Vue({
    router,
    store,
    render: h => h(App),
    created() {
      store.dispatch('stateChanged', user)

      store.dispatch('setLoadedCycles');
      store.dispatch('setLoadedBooks');
    },
  }).$mount('#app')
});