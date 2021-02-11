import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import user from '../api/user'
import auth from '../api/auth'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    users: null,
    active_user: null,
    token: null,
    username: null,
  },
  getters: {
    users: state => state.users,
    user: state => state.active_user,
    username: state => state.username,
    isAuthenticated: state => !!state.token,
    authStatus: state => state.status,
  },
  mutations: {
    get_users(state, data) {
      state.users = data;
    },
    get_user(state, data) {
      state.active_user = data
    },
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
    async get_users({ commit }) {
      const response = await user.get()
      commit('get_users', response.data)
    },
    async get_user({ commit }, id) {
      const response = await user.get(id)
      commit('get_user', response.data)
    },
    save_user(context, data, id) {
      return user.put(data, id)
    },
    create_user(context, data) {
      return user.post(data)
    },
    delete_user(context, id) {
      return user.delete(id)
    },
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
      commit('auth_success', { token, username })
      axios.defaults.headers.common['Authorization'] = token;
    }
  }
})
