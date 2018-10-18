// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import '../static/site/css/style.css';
import $ from 'jquery';
import axios from 'axios';
import moment from 'moment';
import VueLazyload from 'vue-lazyload';
import store from './store';

Vue.use(VueLazyload, {
    preLoad: 1.3,
    // error: 'dist/error.png',
    loading: '../static/site/img/loading.gif',
    attempt: 1
});

axios.defaults.baseURL = 'http://47.106.148.205:8899';
axios.defaults.withCredentials = true;// 让ajax携带cookie
// 全局使用的可以挂在到原型上
Vue.prototype.$jq = $;
Vue.prototype.$axios = axios;

Vue.filter('time', function (value, format = 'YYYY-MM-DD') {
    if (!value) return '';
    return moment(value).format(format);
});

Vue.config.productionTip = false;

Vue.use(ElementUI); // 基于vue用use引入

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>',
    store // 注入到跟实例
});
