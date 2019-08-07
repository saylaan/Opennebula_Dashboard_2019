// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'es6-promise/auto';
import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import { sync } from 'vuex-router-sync'
import store from '@/store/store'
import Panel from '@/components/Global/Panel'

Vue.config.productionTip = false

Vue.use(Vuetify, {
  iconfont: 'md'
})
Vue.component('panel', Panel)

sync(store, router)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  vuetify: new Vuetify(),
  router,
  store,
  components: { App },
  template: '<App/>'
})
