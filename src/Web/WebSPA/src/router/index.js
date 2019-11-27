import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Login/Login.vue'
import Dashboard from '@/components/Dashboard/Dashboard.vue'

Vue.use(Router)
const router = new Router({
  mode: 'history',
  scrollBehavior: (to, from, savedPosition) => {
    if (to.hash) {
      return {
        selector: to.hash
      }
    }
    if (savedPosition) {
      return savedPosition
    } else {
      return {x: 0, y: 0}
    }
  },
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta: {
        title: 'Home'
      }
    },
    {
      path: '/SignIn',
      name: 'Home',
      component: Home,
      meta: {
        title: 'Home'
      }
    },
    {
      path: '/Dashboard',
      name: 'Dashboard',
      component: Dashboard,
      meta: {
        title: 'Dashboard'
      }
    },
  ]

})
router.beforeEach((to, from, next) => {
  document.title = to.meta.title
  next()
})

export default router
