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
import Vuex from 'vuex';

Vue.use(VueLazyload, {
    preLoad: 1.3,
    // error: 'dist/error.png',
    loading: '../static/site/img/loading.gif',
    attempt: 1
});

axios.defaults.baseURL = 'http://47.106.148.205:8899';
// 全局使用的可以挂在到原型上
Vue.prototype.$jq = $;
Vue.prototype.$axios = axios;

Vue.filter('time', function (value, format = 'YYYY-MM-DD') {
    if (!value) return '';
    return moment(value).format(format);
});

Vue.config.productionTip = false;
Vue.use(Vuex); // vue.prototyoe.$store
Vue.use(ElementUI); // 基于vue用use引入

const store = new Vuex.Store({
    state: {},
    mutations: {
        /**
         *
         * @param {*} state 第一个参数必须是state
         * @param {*} goods 第二个是载荷, 也就是参数
         */
        addGoods (state, goods) {
            console.log(goods);
        }
    },
    actions: {

    },
    getters: {

    }
});

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>',
    store // 注入到跟实例
});
