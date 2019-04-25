import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Main/Home'
import Register from '@/components/Main/Register'
import SignIn from '@/components/Main/SignIn'
import Message from '@/components/Main/Message'
import Vlabs from '@/components/Vlabs/Index'
import CreateVlab from '@/components/Vlabs/Admin/Manage/CreateVlab'
import EditVlab from '@/components/Vlabs/Admin/Manage/EditVlab'
import ViewVlab from '@/components/Vlabs/Admin/ViewVlab/Index'
import Dashboard from '@/components/Dashboard/Index'
import Settings from '@/components/Settings/Index'
import Users from '@/components/Users/Index'
import CreateUser from '@/components/Users/Manage/CreateUser'
import EditUser from '@/components/Users/Manage/EditUser'
import ViewUser from '@/components/Users/ViewUser/index'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '*',
      redirect: 'home'
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
      path: '/message',
      name: 'message',
      component: Message
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard
    },
    {
      path: '/settings',
      name: 'settings',
      component: Settings
    },
    {
      path: '/users',
      name: 'users',
      component: Users
    },
    {
      path: '/users/:userId',
      name: 'user',
      component: ViewUser
    },
    {
      path: '/users/create',
      name: 'user-create',
      component: CreateUser
    },
    {
      path: '/users/:userId/edit',
      name: 'edit-user',
      component: EditUser
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
    }
  ]
})
