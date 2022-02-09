import Vue from 'vue'


//plugins
import '@/plugins/apexcharts'
import '@/plugins/vue-js-modal'
import '@/plugins/vue-linkified'
import '@/plugins/gtm'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css
import '@/styles/fonts.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon

import Ads from 'vue-google-adsense'

Vue.config.silent = true;

// set ElementUI lang to EN
Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
// Vue.use(ElementUI)

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App) 
})

// Google Adsense
Vue.use(require('vue-script2'))
Vue.use(Ads.Adsense)