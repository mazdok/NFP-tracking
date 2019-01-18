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

Vue.use(require('vue-moment'));
Vue.use(ElementUI)
Vue.use(Element)

firebase.initializeApp(firebaseConfig)
// export const db = firebase.firestore()

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
  created() {
    firebase.auth().onAuthStateChanged(function(user) {
      store.dispatch('stateChanged', user)
    });
  },
}).$mount('#app')