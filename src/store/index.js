import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    users: null,
  },
  getters: {
    users: state => state.users
  },
  mutations: {
    load_data(state, data) {
      state.users = data;
    },
  },
  actions: {
    async load_data({ commit }) {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/0.1/users.json"
        );
        commit('load_data', response.data)
      } catch (error) {
        console.log(error);
      }
    }
  },
  modules: {
  }
})
