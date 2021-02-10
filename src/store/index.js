import Vue from 'vue'
import Vuex from 'vuex'
import user from '../api/user'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    users: null,
  },
  getters: {
    users: state => state.users,
    user: state => id => {
      return state.users.find((user) => user.id == id);
    }
  },
  mutations: {
    get_users(state, data) {
      state.users = data;
    },
  },
  actions: {
    async get_users({ commit }) {
      const response = await user.get()
      commit('get_users', response.data)
      return true
    },
    save_user(context, { data, id } = {}) {
      if (id) {
        return user.put(data, id)
      } else if (data) {
        return user.post(data)
      }
    },
    delete_user(context, id) {
      user.delete(id)
      // .then(
      //   console.log("success")
      // )
      // .catch(
      //   console.log("fail")
      // )
      console.log("A")
    }
  },
})
