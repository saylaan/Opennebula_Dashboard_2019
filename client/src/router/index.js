import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Register from '@/components/Register'
import SignIn from '@/components/SignIn'
import messageFAQ from '@/components/MessageFAQ'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/signin',
      name: 'signin',
      component: SignIn
    },
    {
      path: '/messageFAQ',
      name: 'messageFAQ',
      component: messageFAQ
    }
  ]
})
