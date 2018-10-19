import Vuex from 'vuex';
import Vue from 'vue';

import state from './state';
import getters from './getters';
import mutations from './mutations';
import actions from './actions';

Vue.use(Vuex); // vue.prototyoe.$store

const store = new Vuex.Store({
    state,
    // 同步设置state值
    mutations,
    // 异步设置state值
    actions,
    getters
});

export default store;
