import {getLocalGoods} from '../common/localStorageHelper';

export default {
    // 获取商品总数
    getBuyCount (state) {
        return state.buyCount;
    },
    getLocalGoods () {
        return getLocalGoods();
    }
};
