import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import api from '@/api';
import echarts from 'echarts';
import { serverConfig } from '@/config/server.config';
import smessage from '@/utils/smessage';
import { Message } from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// 字体文件
import './assets/font/DINNextLTPro-Medium.css';

Vue.config.productionTip = process.env.NODE_ENV === 'production' ? false : true;
Vue.config.devtools = process.env.NODE_ENV === 'production' ? false : true;

Vue.prototype.$api = api;
Vue.prototype.$echarts = echarts;
Vue.prototype.$message = Message;
Vue.prototype.$smessage = smessage;
Vue.prototype.$serverConfig = serverConfig;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
