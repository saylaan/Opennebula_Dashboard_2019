import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Main/Home'

import Register from '@/components/Main/Register'
import SignIn from '@/components/Main/SignIn'

import Message from '@/components/Message/Message'
import ViewMessage from '@/components/Message/ViewMessage/Index'

import Dashboard from '@/components/Dashboard/Index'

import Vlabs from '@/components/Vlabs/Index'
import CreateVlab from '@/components/Vlabs/Admin/Manage/CreateVlab'
import EditVlab from '@/components/Vlabs/Admin/Manage/EditVlab'
import Settings from '@/components/Settings/Index'
import ViewVlab from '@/components/Vlabs/ViewVlab/Index'

import Users from '@/components/Users/Index'
import CreateUser from '@/components/Users/Manage/CreateUser'
import EditUser from '@/components/Users/Manage/EditUser'
import ViewUser from '@/components/Users/ViewUser/Index'

import CreateUrl from '@/components/Vlabs/ViewVlab/Admin/Manage/CreateUrl'
import EditUrl from '@/components/Vlabs/ViewVlab/Admin/Manage/EditUrl'

import CreateVm from '@/components/Vlabs/ViewVlab/Admin/Manage/CreateVm'
import EditVm from '@/components/Vlabs/ViewVlab/Admin/Manage/EditVm'

import CreateSip from '@/components/Vlabs/ViewVlab/Admin/Manage/CreateSip'
import EditSip from '@/components/Vlabs/ViewVlab/Admin/Manage/EditSip'

Vue.use(Router)

export default new Router({
  hashbang: false,
  hash: false,
  mode: 'hash',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '*',
      redirect: '/'
    },
    // {
    //   path: '/register',
    //   name: 'register',
    //   component: Register
    // },
    {
      path: '/signin',
      name: 'signin',
      component: SignIn
    },
    // {
    //   path: '/message',
    //   name: 'message',
    //   component: Message
    // },
    // {
    //   path: '/message/:messageId',
    //   name: 'message-view',
    //   component: ViewMessage
    // },
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
    // {
    //   path: '/users/:userId',
    //   name: 'user',
    //   component: ViewUser
    // },
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
    // {
    //   path: '/vlabs/create',
    //   name: 'vlab-create',
    //   component: CreateVlab
    // },
    {
      path: '/vlabs/:vlabId',
      name: 'vlab',
      component: ViewVlab
    },
    // {
    //   path: '/vlabs/:vlabId/edit',
    //   name: 'edit-vlab',
    //   component: EditVlab
    // },
    {
      path: '/vlabs/:vlabId/create',
      name: 'create-url',
      component: CreateUrl
    },
    {
      path: '/vlabs/:vlabId/editUrl/:urlId',
      name: 'edit-url',
      component: EditUrl
    }
    // {
    //   path: '/vlabs/:vlabId/create',
    //   name: 'create-vm',
    //   component: CreateVm
    // },
    // {
    //   path: '/vlabs/:vlabId/editVm/:vmId',
    //   name: 'edit-vm',
    //   component: EditVm
    // },
    // {
    //   path: '/vlabs/:vlabId/create',
    //   name: 'create-sip',
    //   component: CreateSip
    // },
    // {
    //   path: '/vlabs/:vlabId/editSip/:sipId',
    //   name: 'edit-sip',
    //   component: EditSip
    // }
  ]
})
