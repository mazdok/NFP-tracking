import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Element from 'element-ui'
import ElementUI from 'element-ui'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faBars, faSignOutAlt, faHeart} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import './registerServiceWorker'
import './styles.scss'
import firebase from 'firebase/app'
import 'firebase/firestore'
import firebaseConfig from './config/firebase'
import VueScrollTo from 'vue-scrollto'
import scrollToConfig from './config/scrollToConfig'
import { VueHammer } from 'vue2-hammer'

Vue.use(VueHammer)
Vue.use(VueScrollTo, scrollToConfig)
Vue.use(require('vue-moment'));
Vue.use(ElementUI)
Vue.use(Element)
library.add([faBars, faSignOutAlt, faHeart])
Vue.component('font-awesome-icon', FontAwesomeIcon)

const firebaseApp = firebase.initializeApp(firebaseConfig)
const db = firebaseApp.firestore()
db.settings({
  timestampsInSnapshots: true
})

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
    }).$mount('#app')
  }
})