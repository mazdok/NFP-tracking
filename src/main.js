import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// Localization
import i18n from 'vue-i18n';
// ElementUI & UI related
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/display.css';
import locale from 'element-ui/lib/locale/lang/en'
import './styles.scss'
import VueScrollTo from 'vue-scrollto'
import scrollToConfig from './config/scrollToConfig'
import { VueHammer } from 'vue2-hammer'
// FontAwesome icons
import { library } from '@fortawesome/fontawesome-svg-core'
import { faBars, faSignOutAlt, faHeart} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
// PWA
import './registerServiceWorker'
// Firebase 
import firebase from 'firebase/app'
import 'firebase/firestore'
import firebaseConfig from './config/firebase'

// ElementUI & UI related
Vue.use(i18n);
Vue.use(ElementUI, { locale })
Vue.config.lang = 'en';
Vue.use(VueHammer)
Vue.use(VueScrollTo, scrollToConfig)
Vue.use(require('vue-moment'));
// FontAwesome icons
Vue.component('font-awesome-icon', FontAwesomeIcon)
library.add([faBars, faSignOutAlt, faHeart])
// Firebase 
const firebaseApp = firebase.initializeApp(firebaseConfig)
const db = firebaseApp.firestore()
db.settings({
  // timestampsInSnapshots: true
})
Vue.$db = db
Vue.config.productionTip = false
// db.enablePersistence();

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