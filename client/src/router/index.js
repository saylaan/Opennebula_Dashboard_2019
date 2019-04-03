import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Main/Home'
import Register from '@/components/Main/Register'
import SignIn from '@/components/Main/SignIn'
import MessageFAQ from '@/components/Main/MessageFAQ'
import Vlabs from '@/components/Vlabs/Index'
import CreateVlab from '@/components/Vlabs/CreateVlab'
import EditVlab from '@/components/Vlabs/EditVlab'
import ViewVlab from '@/components/Vlabs/ViewVlab/Index'

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
    },
    {
      path: '/vlabs/:vlabId/edit',
      name: 'edit-vlab',
      component: EditVlab
    },
    {
      path: '*',
      redirect: 'vlabs'
    }
  ]
})
