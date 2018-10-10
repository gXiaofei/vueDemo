const KEY = 'goods';
// 获取本地数据
export const getLocalGoods = () => {
    return JSON.parse(localStorage.getItem(KEY) || '{}');
};
// 获取商品总数
export const getTotalCount = () => {
    const localGoods = getLocalGoods();
    let count = 0;
    for (let key in localGoods) {
        count += localGoods[key];
    }
    return count;
};

export const addLocalGoods = goods => {
    const localGoods = getLocalGoods();
    if (localGoods[goods.goodsId]) {
        localGoods[goods.goodsId] += goods.count;
    } else {
        localGoods[goods.goodsId] = goods.count;
    }
    // 保存在本地
    localStorage.setItem(KEY, JSON.stringify(localGoods));
    // 返回商品总数
    return getTotalCount();
};

export const updateGoods = goods => {
    const localGoods = getLocalGoods();
    localGoods[goods.goodsId] = goods.count;
    // 保存在本地
    localStorage.setItem(KEY, JSON.stringify(localGoods));
    // 返回商品总数
    return getTotalCount();
};

export const deleteLocalGoodsById = goodsId => {
    const localGoods = getLocalGoods();

    delete localGoods[goodsId];

    // 保存在本地
    localStorage.setItem(KEY, JSON.stringify(localGoods));
    // 返回商品总数
    return getTotalCount();
};
