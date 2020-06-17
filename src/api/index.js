import axios from 'axios';
import Vue from 'vue';

// 创建axios实例
const api = axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL,
  timeout: 10000
});

// axios实例默认配置
axios.defaults.crossDomain = true;
api.defaults.headers.post['Content-Type'] = 'application/json; charset=utf-8';
api.defaults.transformRequest = data => {
  return JSON.stringify(data);
};

api.interceptors.response.use(
  response => {
    const res = response.data;
    if (res.success) {
      return Promise.resolve(res);
    }

    Vue.prototype.$smessage('网络异常，请稍后重试！', 'error');
    return Promise.reject(res);
  },
  error => {
    if (/timeout\sof\s\d+ms\sexceeded/.test(error.message)) {
      Vue.prototype.$smessage('网络出了点问题，请稍后重试！', 'error');
    }
    if (error.response) {
      // http状态码判断
      switch (error.response.status) {
        // http status handler
        case 404:
          Vue.prototype.$smessage('请求的资源不存在！', 'error');
          break;
        case 500:
          Vue.prototype.$smessage('内部错误，请稍后重试！', 'error');
          break;
        case 503:
          Vue.prototype.$smessage('服务器正在维护，请稍等！', 'error');
          break;
      }
    }
    return Promise.reject(error.response);
  }
);

// 处理get请求
const get = (url, params, config = {}) => api.get(url, { ...config, params });
// 处理delete请求，为了防止和关键词delete冲突，方法名定义为del
const del = (url, params, config = {}) => api.del(url, { ...config, params });
// 处理post请求
const post = (url, params, config = {}) => api.post(url, params, config);
// 处理put请求
const put = (url, params, config = {}) => api.pust(url, params, config);

export default { get, post, del, put };
