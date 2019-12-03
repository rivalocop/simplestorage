// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import jQuery from 'jquery'
import './assets/styles/main.scss'
import store from './store'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import BootstrapVue from 'bootstrap-vue'
import './mixins/common.js'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Toasted from 'vue-toasted'
import './mixins/common.js'
import GSignInButton from 'vue-google-signin-button'
import BaseMaterial from './components/common/base-material/index'
import { LicenseManager } from 'ag-grid-enterprise';


global.jQuery = jQuery
global.$ = jQuery

Vue.config.productionTip = false
Vue.use(BootstrapVue)
Vue.use(VueAxios, axios)
Vue.use(Toasted)
Vue.use(GSignInButton)
Vue.use(BaseMaterial)

LicenseManager.setLicenseKey(`Bespin_Global_MultiApp_2Devs_1Deployment_13_June_2020__MTU5MjAwMjgwMDAwMA==28cf104795ce1de3a2c9e9cada124ab0`);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
