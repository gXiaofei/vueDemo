<template>
  <div>
    <div class="section">
      <div class="location">
        <span>当前位置：</span>
        <a href="/index.html">首页</a> &gt;
        <a href="/cart.html">购物车</a>
      </div>
    </div>
    <div class="section">
      <div class="wrapper">
        <div class="bg-wrap">
          <!--购物车头部-->
          <div class="cart-head clearfix">
            <h2>
            <i class="iconfont icon-cart"/>我的购物车</h2>
            <div class="cart-setp">
              <ul>
                <li class="first active">
                  <div class="progress">
                    <span>1</span>
                    放进购物车
                  </div>
                </li>
                <li>
                  <div class="progress">
                    <span>2</span>
                    填写订单信息
                  </div>
                </li>
                <li class="last">
                  <div class="progress">
                    <span>3</span>
                    支付/确认订单
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <!--购物车头部-->
          <!--商品列表-->
          <div class="cart-box">
            <input
              id="jsondata"
              name="jsondata"
              type="hidden">
            <table
              width="100%"
              align="center"
              class="cart-table"
              border="0"
              cellspacing="0"
              cellpadding="8">
              <tbody>
                <tr>
                  <th
                    width="48"
                    align="center">
                    <a>选择</a>
                  </th>
                  <th
                    align="left"
                    colspan="2">商品信息</th>
                  <th
                    width="84"
                    align="left">单价</th>
                  <th
                    width="104"
                    align="center">数量</th>
                  <th
                    width="104"
                    align="left">金额(元)</th>
                  <th
                    width="54"
                    align="center">操作</th>
                </tr>
                <tr
                  v-for="(item, index) in goodsList"
                  :key="item.id">
                  <td
                    width="48"
                    align="center">
                    <el-switch
                      v-model="item.isSelected"
                      active-color="#409eff"
                      inactive-color="#555555"/>
                  </td>
                  <td
                    align="left"
                    colspan="2">
                    <div class="shopInfo">
                      <img
                        :src="item.img_url"
                        style="width:50px;height:50px;margin-right: 10px;"
                        alt="">
                      <span>{{ item.title }}</span>
                    </div>
                  </td>
                  <td
                    width="84"
                    align="left">{{ item.sell_price }}</td>
                  <td
                    width="104"
                    align="center">
                    <InputNumber
                      :init-count="item.buycount"
                      :goods-id="item.id"
                      @numberChange="getChangeGoods"
                  /></td>
                  <td
                    width="104"
                    align="left">{{ item.sell_price * item.buycount }}</td>
                  <td
                    width="54"
                    align="center"><a
                      href="javascript:;"
                      @click="deleteGoods(index, item.id)">删除</a></td>
                </tr>
                <tr v-if="goodsList.length === 0">
                  <td colspan="10">
                    <div class="msg-tips">
                      <div class="icon warning">
                        <i class="iconfont icon-tip"/>
                      </div>
                      <div class="info">
                        <strong>购物车没有商品！</strong>
                        <p>您的购物车为空，
                        <a href="/index.html">马上去购物</a>吧！</p>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <th
                    align="right"
                    colspan="8">
                    已选择商品
                    <b
                      id="totalQuantity"
                      class="red">{{ getTotalCount }}</b> 件 &nbsp;&nbsp;&nbsp; 商品总金额（不含运费）：
                    <span class="red">￥</span>
                    <b
                      id="totalAmount"
                      class="red">{{ getTotalPrice }}</b>元
                  </th>
                </tr>
              </tbody>
            </table>
          </div>
          <!--/商品列表-->
          <!--购物车底部-->
          <div class="cart-foot clearfix">
            <div class="right-box">
              <button
                class="button"
                @click="continueBuy">继续购物</button>
              <button
                class="submit"
                @click="sumbitOrder">立即结算</button>
            </div>
          </div>
        <!--购物车底部-->
        </div>
      </div>
    </div>
  </div>
</template>

<script>

    import InputNumber from './InputNumber.vue';
    import {getLocalGoods} from '../../common/localStorageHelper.js';
    import {DELETE_GOODS} from '../../store/mutations-types.js';

    export default {
        components: {
            InputNumber
        },
        data () {
            return {
                goodsList: []
            };
        },
        computed: {
            // 获取商品总数
            getTotalCount () {
                let count = 0;
                this.goodsList.forEach(item => {
                    if (item.isSelected) {
                        count += item.buycount;
                    }
                });
                return count;
            },
            // 获取价格总数
            getTotalPrice () {
                let price = 0;
                this.goodsList.forEach(item => {
                    if (item.isSelected) {
                        price += item.sell_price * item.buycount;
                    }
                });
                return price;
            }
        },
        created () {
            this.getGoodsListData();
        },
        methods: {
            getGoodsListData () {
                const localGoods = getLocalGoods(); // 每次加载进来都要重新获取本地值

                if (Object.keys(localGoods).length === 0) return;
                const url = `site/comment/getshopcargoods/${Object.keys(localGoods).join(',')}`;

                this.$axios.get(url).then(res => {
                    res.data.message.forEach(goods => {
                        goods.buycount = localGoods[goods.id];
                        goods.isSelected = true;
                    });
                    this.goodsList = res.data.message;
                }, err => {
                    console.log(err);
                });
            },
            // 子组件触发该函数来传值
            getChangeGoods (changeGoods) {
                this.goodsList.forEach(item => {
                    if (item.id === changeGoods.goodsId) item.buycount = changeGoods.count;
                });
                this.$store.commit(DELETE_GOODS, changeGoods);
            },

            // 删除商品
            deleteGoods (index, goodsId) {
                this.$confirm('是否删除该商品?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.goodsList.splice(index, 1);
                    this.$store.commit(DELETE_GOODS, goodsId);
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                }).catch(() => {

                });
            },

            // 继续购物
            continueBuy () {
                this.$router.push('goodslist');
            },
            // 下订单
            sumbitOrder () {
                const tempArr = [];

                this.goodsList.forEach(goods => {
                    if (goods.isSelected) {
                        tempArr.push(goods.id);
                    }
                });

                if (tempArr.length === 0) {
                    this.$message({
                        message: '至少选择一个进行下单',
                        type: 'warning'
                    });
                    return;
                };

                this.$router.push({
                    path: 'order',
                    query: {
                        ids: tempArr.join(',')
                    }
                });
            }
        }
    };
</script>
