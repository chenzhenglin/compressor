import Vue from 'vue'
import axios from 'axios'
import elementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
/*import './Element_custom_theme_2019_07_04_08_07_05/theme/index.css'*/
import './css/common.css'

import App from './App'
import router from './router'
import store from './store'

Vue.use(elementUI);
if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
