import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import store from './store'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/settings',
      name: 'settings',
      component: () => import('./views/Settings.vue'),
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/cycles',
      name: 'cycles',
      component: () => import(/* webpackChunkName: "about" */ './views/Cycles.vue'),
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/cycles/:id',
      name: 'edit-day',
      component: () => import('./views/EditDay.vue'),
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/signup',
      name: 'signup',
      component: () => import('./views/Signup.vue'),
      meta: {
        requireGuest: true
      }
    },
    {
      path: '/signin',
      name: 'signin',
      component: () => import('./views/Signin.vue'),
      meta: {
        requireGuest: true
      }
    },
    {
      path: '/welcome',
      name: 'welcome',
      component: () => import('./views/Welcome.vue'),
      meta: {
        requireGuest: true
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requireAuth)) {
    if(!store.getters.isUserAuthenticated) {
      next({
        path: '/welcome',
        query: {
          redirect: to.fullPath
        }
      });
    } else {
      next();
    }
  } else if (to.matched.some(record => record.meta.requireGuest)) {
    if(store.getters.isUserAuthenticated) {
      next({
        path: '/',
        query: {
          redirect: to.fullPath
        }
      });
    } else {
      next();
    }
  } else {
    next();
  }
})

export default router;