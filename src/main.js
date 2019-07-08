import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import axios from 'axios'
import VueAxios from 'vue-axios'
 
Vue.use(VueAxios, axios);

Vue.filter('capitalize', function (value) {
  if (!value) return '';
  value = value.toString();
  return value.toUpperCase();
});

Vue.filter('min', function (value) {
  if (!value) return '';
  value = value.toString();
  return value.normalize('NFD').replace(/[\u0300-\u036f]/g,"");
});

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
