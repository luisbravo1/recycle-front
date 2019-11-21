import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Login from './views/Login.vue'
import Maps from './views/Maps.vue'
import AddPlace from './views/AddPlace.vue'
import Contact from './views/Contact.vue'
import Info from './views/Info.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/addPlace',
      name: 'addPlace',
      component: AddPlace
    },
    {
      path: '/maps',
      name: 'maps',
      component: Maps
    },
    {
      path: '/contact',
      name: 'contact',
      component: Contact
    },
    {
      path: '/info',
      name: 'info',
      component: Info
    }
  ]
})
