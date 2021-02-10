import Vue from 'vue'
import Vuex from 'vuex'
import user from '../api/user'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    users: null,
    active_user: null,
  },
  getters: {
    users: state => state.users,
    user: state => state.active_user,
  },
  mutations: {
    get_users(state, data) {
      state.users = data;
    },
    get_user(state, data) {
      state.active_user = data
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
    }
  },
})
