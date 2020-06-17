import debounce from 'lodash/debounce';
import Vue from 'vue';

const SMessage = debounce((message, type = 'info', config = {}) => {
  Vue.prototype.$message({
    message,
    type,
    ...config
  });
}, 300);

export default SMessage;
