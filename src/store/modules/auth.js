import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import auth from '../../api/auth'
Vue.use(Vuex)

export default {
  state: {
    token: localStorage.getItem('user-token') || null, // This makes it work
    username: null,
  },
  getters: {
    username: state => state.username,
    isAuthenticated: state => !!state.token,
    authStatus: state => state.status,
  },
  mutations: {
    auth_success(state, data) {
      state.token = data.token
      state.username = data.username
    },
    auth_logout(state) {
      state.token = null
      state.username = null
    }
  },
  actions: {
    auth_request({ commit }, data) {
      auth.get_token(data)
        .then(response => {
          const token = "Token " + response.data.token
          const username = data.username
          commit('auth_success', { token, username })
          localStorage.setItem('user-token', token)
          localStorage.setItem('username', username)
          axios.defaults.headers.common['Authorization'] = token;
        })
        .catch(() => {
          localStorage.removeItem('user-token')
        })
    },
    auth_logout({ commit }) {
      commit('auth_logout')
      localStorage.removeItem('user-token')
      localStorage.removeItem('username')
      delete axios.defaults.headers.common['Authorization']
    },
    auto_login({ commit }) {
      const token = localStorage.getItem('user-token')
      if (!token) {
        return
      }
      const username = localStorage.getItem('username')
      auth.get_user_by_username(username)
        .then((r) => {
          console.log(r.data)
          // commit() userdata here from response
        })
      commit('auth_success', { token, username })
      axios.defaults.headers.common['Authorization'] = token;
    }
  }
}
