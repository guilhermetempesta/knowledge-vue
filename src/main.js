import 'font-awesome/css/font-awesome.css'
import Vue from 'vue'

import App from './App'

import './config/bootstrap'
import './config/msgs'
import store from './config/store'
import router from './config/router'

Vue.config.productionTip = false

//TEMPORARIO!
require('axios').defaults.headers.common['Authorization'] = 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImJlYmE0NjMyLWI5NDItNDA4Mi1hZjg5LWNmOGZiZGE3NzNhMSIsImVtYWlsIjoiZ3VpbGhlcm1ldGVtcGVzdGFAZ21haWwuY29tIiwicm9sZSI6InVzZXIiLCJpYXQiOjE2MTkwNDAzNjgsImV4cCI6MTYxOTA2NTk0N30.T8GhIZhWuW1EsUzejjJ7cxS_PfnhbOzN0C1ZxZ5tcBo'

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')