import Vue from 'vue'
import App from './App.vue'
import axios from './plugins/axios'

Vue.config.productionTip = false

window.__version__ = 3

Vue.use(axios)

new Vue({
  render: h => h(App),
}).$mount('#app')
