import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import auth from './modules/auth'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user,
    auth
  },
  state: {
    messages: []
  },
  getters: {
    messages: state => state.messages
  },
  actions: {
    add_message(context, data) {
      this.state.messages.push(data)
      setTimeout(() => {
        this.state.messages.shift()
      }, 1000);
    }
  }
})
