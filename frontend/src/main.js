import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/store.js'
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'
import axios from 'axios'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import { faSave } from '@fortawesome/free-solid-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { faSquare } from '@fortawesome/free-regular-svg-icons'
import { faCheckSquare } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faChevronLeft)
library.add(faChevronRight)
library.add(faEdit)
library.add(faSave)
library.add(faTrash)
library.add(faCheck)
library.add(faSquare)
library.add(faCheckSquare)

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
