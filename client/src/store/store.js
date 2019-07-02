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
    type: {},
    isUserLoggedIn: false,
    admin: false,
    dark: false,
    grad: 'to top right, #5D29A9, #CBC8D0'
  },
  mutations: {
    setType(state, type) {
      if (type) {
        state.type = type
      } else {
        state.type = type
      }
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
    setType({ commit }, type) {
      commit('setType', type)
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
