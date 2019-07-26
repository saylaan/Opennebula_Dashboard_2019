import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({ // for keeping tracking of state
  strict: true,
  plugins: [
    createPersistedState()
  ],
  state: {
    token: {},
    user: null,
    userdata: {
      firstname: 'none',
      lastname: 'none'
    },
    isUserLoggedIn: false,
    admin: false,
    dark: false,
    grad: 'to top right, #5D29A9, #CBC8D0',
    nbvlab: 0,
    active: {
      one: null,
      two: null,
      three: null,
      four: null
    }
  },
  mutations: {
    setActive(state, active) {
      if (active === 'one') {
        state.active.one = 'primary'
        state.active.two = null
        state.active.three = null
        state.active.four = null
      } else if (active === 'two') {
        state.active.one = null
        state.active.two = 'primary'
        state.active.three = null
        state.active.four = null
      } else if (active === 'three') {
        state.active.one = null
        state.active.two = null
        state.active.three = 'primary'
        state.active.four = null
      } else if (active === 'four') {
        state.active.one = null
        state.active.two = null
        state.active.three = null
        state.active.four = 'primary'
      }
    },
    setNbVlab(state, nbvlab) {
      state.nbvlab = nbvlab
    },
    setGrad(state, grad) {
      if (grad) {
        state.grad = grad
      } else {
        state.grad = grad
      }
    },
    setToken(state, token) {
      state.token = token
      if (token) {
        state.isUserLoggedIn = true
      } else {
        state.isUserLoggedIn = false
      }
    },
    setUser(state, user) {
      state.user = user
    },
    setAdmin(state, admin) {
      if (admin) {
        state.admin = admin
      } else {
        state.admin = admin
      }
    },
    setDark(state, dark) {
      if (dark) {
        state.dark = dark
      } else {
        state.dark = dark
      }
    }
  },
  actions: {
    setNbVlab({ commit }, nbvlab) {
      commit('setNbVlab', nbvlab)
    },
    setActive({ commit }, active) {
      commit('setActive', active)
    },
    setGrad({ commit }, grad) {
      commit('setGrad', grad)
    },
    setToken({ commit }, token) {
      commit('setToken', token)
    },
    setUser({ commit }, user) {
      commit('setUser', user)
    },
    setAdmin({ commit }, admin) {
      commit('setAdmin', admin)
    },
    setDark({ commit }, dark) {
      commit('setDark', dark)
    }
  }
})
