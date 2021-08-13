// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store.js'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/css/style.css'
import * as filters from './plugin/filters.js'
Object.keys(filters).forEach(key=>{
    Vue.filter(key,filters[key])//插入过滤器名和对应方法
});

Vue.config.productionTip = false
Vue.config.devtools = true

Vue.use(ElementUI)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
