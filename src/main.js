import Vue from 'vue'
import App from './App.vue'
import axios from './plugins/axios'

Vue.config.productionTip = false

window.__version__ = 3

Vue.use(axios)


new Vue({
  render: h => h(App),
}).$mount('#app')



// 请求学工的后端
if(window.location.href.startsWith('https://xgbxscwx.seu.edu.cn/')){
  window.$axios.post("https://xgbxscwx.seu.edu.cn/api/wxConfig",{ 
    url: window.location.href
  }).then((wxConfig) => {
    window.wx.config(wxConfig.data.result)
  })
}
// 请求网信的后端
else if(window.location.href.startsWith('https://seicwxbz.seu.edu.cn/')){
  window.$axios.get(`https://seicwxbz.seu.edu.cn/api/jssdk?extraUrl=${window.location.href}`).then((wxConfig) => {
    window.wx.config(wxConfig.data.result)
  })
}

window.wx.ready(function(){
})
