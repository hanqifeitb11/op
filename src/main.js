import Vue from 'vue'
import App from './App.vue'
import './util/install'
import './registerServiceWorker'
import router from './router'
import store from './store'
const hls = require('videojs-contrib-hls')
Vue.use(hls)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
