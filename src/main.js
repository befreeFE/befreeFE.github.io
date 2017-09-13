// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import demoBlock from '@/components/demo-block'
import MainFooter from '@/components/footer'
import MainHeader from '@/components/header'
import SideNav from '@/components/side-nav'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.component('demo-block', demoBlock)
Vue.component('main-footer', MainFooter)
Vue.component('main-header', MainHeader)
Vue.component('side-nav', SideNav)
/* eslint-disable no-new */

new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
