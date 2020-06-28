import Vue from 'vue'
import Vuex from 'vuex'
import user from "@/store/modules/user";
import home from "@/store/modules/home";
import api from '@/store/modules/api'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    device: {
      uuid: 6,
      model: 15415156165151
    },

    version:'0.0.1'// 版本号
  },
  mutations: {
    changeData(state, data) {
      state[data.key] = data.val;
    }
  },
  actions: {
  },
  modules: {
    user,
    home,
    api
  }
})
