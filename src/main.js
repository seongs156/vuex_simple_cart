import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import {won, woo} from "./filters/won"
Vue.config.productionTip = false
//원화 필터를 사용할 수 있도록 글로벌 필터로 등록합니다.
Vue.filter('won',won)
Vue.filter('woo',woo)
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
