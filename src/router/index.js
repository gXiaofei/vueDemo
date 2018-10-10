import Vue from 'vue';
import Router from 'vue-router';

import Goodslist from '../components/goods/Goodslist.vue';
import Shopcart from '../components/shopcart/Shopcart.vue';
import Goodsinfo from '../components/goods/Goodsinfo.vue';
import Order from '../components/order/Order.vue';
import Login from '../components/account/Login.vue';

Vue.use(Router); // 集成中间件  在Vue.prototype.$route 原型上添加了$route   Vue.protoype.$router

export default new Router({
    // mode: 'history', // 可以去掉路由出现的#号
    routes: [
        {
            path: '/',
            redirect: '/goodslist'
        },
        {
            path: '/goodslist',
            name: 'Goodslist',
            component: Goodslist
        },
        {
            path: '/shopcart',
            name: 'Stopcart',
            component: Shopcart
        },
        {
            path: '/goodsinfo/:id',
            name: 'Goodsinfo',
            component: Goodsinfo
        },
        {
            path: '/order',
            name: 'Order',
            component: Order,
            meta: {
                needLogin: true
            }
        },
        {
            path: '/login',
            name: 'Login',
            component: Login
        }
    ]
});
