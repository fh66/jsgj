// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
// 引入element-ui
import ElementUi from 'element-ui'
import '../node_modules/element-ui/lib/theme-chalk/index.css'
import './assets/css/tax.css'
import moment from 'moment'
// 引入axios
import axios from 'axios'
import Crumbs from './components/assembly/crumbs.vue'
import router from './router'
// import axios from './assets/js/usaxios'
// Vue.use(axios)
Vue.use(ElementUi)
Vue.component('crumbs',Crumbs)
Vue.prototype.$http = axios
Vue.config.productionTip = false
Vue.filter('dateformat', function(dataStr, pattern = 'YYYY-MM-DD HH:mm:ss') {
  return moment(dataStr).format(pattern)

})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
