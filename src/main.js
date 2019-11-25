import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import '@babel/polyfill'
import VueResource from 'vue-resource'
import VueCookies from 'vue-cookies'
import moment from 'moment'
import Notifications from 'vue-notification'
import VueApexCharts from 'vue-apexcharts'

Vue.component('apexchart', VueApexCharts)
Vue.use(VueResource)
Vue.use(VueCookies)
Vue.use(Notifications)
Vue.config.productionTip = false

Vue.http.options.root = 'http://localhost:9000/'
Vue.prototype.moment = moment

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
