import Vue from 'vue';
import VueRouter from 'vue-router';
import DataV from '../views/DataV.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'DataV',
    component: DataV
  }
];

const router = new VueRouter({
  routes
});

export default router;
