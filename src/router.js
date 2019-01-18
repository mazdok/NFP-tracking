import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import store from './store'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      beforeEnter: AuthGuard
    },
    {
      path: '/settings',
      name: 'settings',
      component: () => import('./views/Settings.vue'),
      beforeEnter: AuthGuard
    },
    {
      path: '/cycles',
      name: 'cycles',
      component: () => import(/* webpackChunkName: "about" */ './views/Cycles.vue'),
      beforeEnter: AuthGuard
    },
    {
      path: '/cycles/:id',
      name: 'edit-day',
      component: () => import('./views/EditDay.vue'),
      beforeEnter: AuthGuard
    },
    {
      path: '/signup',
      name: 'signup',
      component: () => import('./views/Signup.vue'),
    },
    {
      path: '/signin',
      name: 'signin',
      component: () => import('./views/Signin.vue'),
    },
    {
      path: '/welcome',
      name: 'welcome',
      component: () => import('./views/Welcome.vue'),
    }
  ]
})

//edit it to disable access to signup/signin pages for authUsers
function AuthGuard(from, to, next) {
  if(store.getters.isUserAuthenticated)
    next()
  else
    next('/welcome')
}