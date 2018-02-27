// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import Vant from 'vant'
import 'vant/lib/vant-css/index.css'
import 'vue2-animate/dist/vue2-animate.css'
import './common.css'
import 'lib-flexible'
import VueResource from 'vue-resource'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'

import './assets/iconfont/petshow-icons.css'

Vue.config.productionTip = false
Vue.use(Vant)
Vue.use(VueResource)
Vue.use(VueAwesomeSwiper, {
  zoom: true
})
Vue.http.headers.common['Authorization'] = `${localStorage.token}`
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
