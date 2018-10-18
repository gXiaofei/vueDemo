import Vue from 'vue';
import Router from 'vue-router';
import axios from 'axios';
import Goodslist from '../components/goods/Goodslist.vue';
import Shopcart from '../components/shopcart/Shopcart.vue';
import Goodsinfo from '../components/goods/Goodsinfo.vue';
import Order from '../components/order/Order.vue';
import Login from '../components/account/Login.vue';
import PayOrder from '../components/pay/PayOrder.vue';
Vue.use(Router); // 集成中间件  在Vue.prototype.$route 原型上添加了$route   Vue.protoype.$router

const route = new Router({
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
        },
        {
            path: '/pay/:orderId',
            name: 'PayOrder',
            component: PayOrder,
            meta: {
                needLogin: true
            }
        }
    ]
});

// 利用导航守卫来对路由进行权限控制
route.beforeEach((to, from, next) => {
    // 存储登录界面的上一个页面的路由, 用于登陆完后跳转到相对应的页面
    if (to.fullPath !== '/login') {
        localStorage.setItem('toVisitPath', to.fullPath);
    }

    // 利用路由元信息来对路由进行筛选
    if (to.meta.needLogin) {
        axios.get(`site/account/islogin`).then(res => {
            if (res.data.code === 'nologin') {
                // 未登录
                route.push('login');
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

export default route;
