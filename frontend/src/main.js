import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/store.js'
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'
import axios from 'axios'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons'
import { faAngleRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faAngleLeft)
library.add(faAngleRight)

Vue.component('font-awesome-icon', FontAwesomeIcon)

axios.defaults.baseURL = process.env.VUE_APP_URL
axios.defaults.withCredentials = true

Vue.use(Buefy)

Vue.config.productionTip = false

Vue.filter('formatDateDay', function (value) {
  if (value) {
    return (new Date(value)).toLocaleString('en-US',{ weekday: 'short' })
  }
})

Vue.filter('formatDate', function (value) {
  if (value) {
    return (new Date(value)).toLocaleString('en-US',{ year: "numeric", month: "2-digit", day: "numeric" })
  }
})

Vue.filter('formatDateNum', function (value) {
  if (value) {
    return (new Date(value)).toLocaleString('en-US',{ day: 'numeric' })
  }
})

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
