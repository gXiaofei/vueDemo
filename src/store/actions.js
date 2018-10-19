import * as types from './mutations-types';
export default {
    addGoodsAsync ({commit}, goods) {
        setTimeout(() => {
            commit(types.ADD_GOODS, goods);
        }, 1000);
    }
};
