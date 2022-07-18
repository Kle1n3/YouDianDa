import Vue from 'vue'
import Vuex from 'vuex'
import { setItem, getItem } from '@/utils/getItem'
Vue.use(Vuex)
const userKey = 'YDD_USERTOKEN'
export default new Vuex.Store({
  state: {
    user: getItem(userKey) || {},
  },
  getters: {
    token: state => state.user.token
  },
  mutations: {
    getUserToken(state, data) {
      state.user = data
      setItem(userKey, data)
    }
  },
  actions: {
  },
  modules: {
  }
})
