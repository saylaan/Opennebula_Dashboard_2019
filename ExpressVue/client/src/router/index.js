import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Register from '@/components/Register'
import SignIn from '@/components/SignIn'
import MessageFAQ from '@/components/MessageFAQ'
import Vlabs from '@/components/Vlabs'
import CreateVlab from '@/components/CreateVlab'
import ViewVlab from '@/components/ViewVlab'

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
      component: MessageFAQ
    },
    {
      path: '/vlabs',
      name: 'vlabs',
      component: Vlabs
    },
    {
      path: '/vlabs/create',
      name: 'vlab-create',
      component: CreateVlab
    },
    {
      path: '/vlabs/:vlabId',
      name: 'vlab',
      component: ViewVlab
    }
  ]
})
