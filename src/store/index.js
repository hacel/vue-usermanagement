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
    async toast(context, data) {
      await this.state.messages.push(data)
      window.$(".toast").toast('show')
      setTimeout(() => {
        this.state.messages.shift()
      }, 5000);
    }
  }
})
