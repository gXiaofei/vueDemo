import {addLocalGoods, updateGoods, deleteLocalGoodsById} from '../common/localStorageHelper';
import * as types from './mutations-types';

export default {
    /**
     * 增加商品
     * @param {*} state 第一个参数必须是state
     * @param {*} goods 第二个是载荷, 也就是参数
     */
    [types.ADD_GOODS] (state, goods) {
        state.buyCount = addLocalGoods(goods);
    },
    /**
     * 修改商品
     * @param {*} state 第一个参数必须是state
     * @param {*} goods 第二个是载荷, 也就是参数
     */
    [types.UPDATE_GOODS] (state, goods) {
        state.buyCount = updateGoods(goods);
    },
    /**
     * 删除商品
     * @param {*} state 第一个参数必须是state
     * @param {*} goodsId 第二个是载荷, 也就是参数
     */
    [types.DELETE_GOODS] (state, goodsId) {
        state.buyCount = deleteLocalGoodsById(goodsId);
    }
};
