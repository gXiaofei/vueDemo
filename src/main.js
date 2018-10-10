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
import {addLocalGoods, getTotalCount, getLocalGoods, updateGoods, deleteLocalGoodsById} from './common/localStorageHelper';

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
Vue.use(Vuex); // vue.prototyoe.$store
Vue.use(ElementUI); // 基于vue用use引入

// 利用导航守卫来对路由进行权限控制
router.beforeEach((to, from, next) => {
    // 存储登录界面的上一个页面的路由, 用于登陆完后跳转到相对应的页面
    if (to.fullPath !== '/login') {
        localStorage.setItem('toVisitPath', to.fullPath);
    }

    // 利用路由元信息来对路由进行筛选
    if (to.meta.needLogin) {
        axios.get(`site/account/islogin`).then(res => {
            if (res.data.code === 'nologin') {
                // 未登录
                router.push('login');
            } else {
                // 已登录
                next();
            }
        }, err => {
            console.log(err);
        });
    } else {
        next();
    }
});

const store = new Vuex.Store({
    state: {
        // 初始值设置为本地所存的商品数量
        buyCount: getTotalCount()

    },
    mutations: {
        /**
         * 增加商品
         * @param {*} state 第一个参数必须是state
         * @param {*} goods 第二个是载荷, 也就是参数
         */
        addGoods (state, goods) {
            state.buyCount = addLocalGoods(goods);
        },
        /**
         * 修改商品
         * @param {*} state 第一个参数必须是state
         * @param {*} goods 第二个是载荷, 也就是参数
         */
        updateGoods (state, goods) {
            state.buyCount = updateGoods(goods);
        },
        /**
         * 删除商品
         * @param {*} state 第一个参数必须是state
         * @param {*} goodsId 第二个是载荷, 也就是参数
         */
        deleteGoods (state, goodsId) {
            state.buyCount = deleteLocalGoodsById(goodsId);
        }

    },
    actions: {

    },
    getters: {
        // 获取商品总数
        getBuyCount (state) {
            return state.buyCount;
        },
        getLocalGoods () {
            return getLocalGoods();
        }
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
