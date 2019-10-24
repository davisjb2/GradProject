import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/store.js'
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'
import axios from 'axios'

axios.defaults.baseURL = process.env.VUE_APP_URL
axios.defaults.withCredentials = true

Vue.use(Buefy)

Vue.config.productionTip = false

Vue.filter('formatDate', function (value) {
  if (value) {
    return (new Date(value)).toLocaleString('en-US',{ weekday: 'short', month: 'short', day: 'numeric' })
  }
})

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
