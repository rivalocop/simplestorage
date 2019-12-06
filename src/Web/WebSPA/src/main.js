// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import './assets/styles/main.scss'
import store from './store'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import BootstrapVue from 'bootstrap-vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import GSignInButton from 'vue-google-signin-button'
import BaseMaterial from './components/common/base-material/index'
import { LicenseManager } from 'ag-grid-enterprise';
import 'dayjs/locale/es'
import Toasted from 'vue-toasted';

Vue.config.productionTip = false
Vue.use(BootstrapVue)
Vue.use(VueAxios, axios)
Vue.use(GSignInButton)
Vue.use(BaseMaterial)
Vue.use(Toasted)

LicenseManager.setLicenseKey(`Bespin_Global_MultiApp_2Devs_1Deployment_13_June_2020__MTU5MjAwMjgwMDAwMA==28cf104795ce1de3a2c9e9cada124ab0`);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
