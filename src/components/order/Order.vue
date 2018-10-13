<template>
  <div>
    <div>
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
                <li class="active">
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
          <div class="cart-box">
            <h2 class="slide-tit">
              <span>1、收货地址</span>
            </h2>
            <div
              id="orderForm"
              name="orderForm"
              url="">
              <div class="form-box address-info">
                <el-form
                  ref="orderForm"
                  :model="orderForm"
                  :rules="rules"
                  label-width="100px"
                  class="demo-ruleForm">
                  <el-form-item
                    label="收货人姓名"
                    prop="accept_name">
                    <el-input v-model="orderForm.accept_name"/>
                  </el-form-item>
                  <!-- <el-form-item
                    label="所属地区"
                    prop="area"/>
                </el-form> -->
                  <el-form-item
                    label="详细地址"
                    prop="address">
                    <el-input v-model="orderForm.address"/>
                  </el-form-item>
                  <el-form-item
                    label="手机号码"
                    prop="mobile">
                    <el-input v-model="orderForm.mobile"/>
                  </el-form-item>
                  <el-form-item
                    label="电子邮箱"
                  >
                    <el-input v-model="orderForm.email"/>
                  </el-form-item>
                  <el-form-item
                    label="邮编"
                  >
                    <el-input v-model="orderForm.post_code"/>
                  </el-form-item>
              </el-form></div>
              <h2 class="slide-tit">
                <span>2、支付方式</span>
              </h2>
              <ul class="item-box clearfix">
                <!--取得一个DataTable-->
                <li>
                  <label>
                    <el-radio
                      v-model="orderForm.payment_id"
                      label="6">在线支付</el-radio>
                    <em>手续费：0.00元</em>
                  </label>
                </li>
              </ul>
              <h2 class="slide-tit">
                <span>3、配送方式</span>
              </h2>
              <ul class="item-box clearfix">
                <!--取得一个DataTable-->
                <li>
                  <el-radio-group
                    v-model="orderForm.express_id"
                    @change="expressChange">
                    <el-radio label="1">顺丰快递 <em>费用：20.00元</em></el-radio>
                    <el-radio label="2">圆通快递 <em>费用：10.00元</em></el-radio>
                    <el-radio label="3">韵达快递 <em>费用：8.00元</em> </el-radio>
                  </el-radio-group>
                </li>
              </ul>
              <h2 class="slide-tit">
                <span>4、商品清单</span>
              </h2>
              <div class="line15"/>
              <table
                width="100%"
                border="0"
                align="center"
                cellpadding="8"
                cellspacing="0"
                class="cart-table">
                <tbody>
                  <tr>
                    <th
                      colspan="2"
                      align="left">商品信息</th>
                    <th
                      width="84"
                      align="left">单价</th>
                    <th
                      width="84"
                      align="center">购买数量</th>
                    <th
                      width="104"
                      align="left">金额(元)</th>
                  </tr>
                  <tr
                    v-for="item in goodsList"
                    :key="item.id"
                    s>
                    <td width="68">
                      <a
                        target="_blank"
                        href="/goods/show-89.html">
                        <img
                          :src="item.img_url"
                          style="width: 50px;height: 50px">
                      </a>
                    </td>
                    <td>
                      <a
                        target="_blank"
                        href="/goods/show-89.html">{{ item.title }}</a>
                    </td>
                    <td>
                      <span class="red">
                        ￥{{ item.sell_price }}
                      </span>
                    </td>
                    <td align="center">{{ item.buycount }}</td>
                    <td>
                      <span class="red">
                        ￥{{ item.sell_price * item.buycount }}
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div class="line15"/>
              <h2 class="slide-tit">
                <span>5、结算信息</span>
              </h2>
              <div class="buy-foot clearfix">
                <div class="left-box">
                  <dl>
                    <dt>订单备注(100字符以内)</dt>
                    <dd>
                      <textarea
                        v-model="orderForm.message"
                        name="message"
                        class="input"
                        style="height:35px;"/>
                    </dd>
                  </dl>
                </div>
                <div class="right-box">
                  <p>
                    商品
                    <label class="price">{{ totalCount }}</label> 件&nbsp;&nbsp;&nbsp;&nbsp; 商品金额：￥
                    <label
                      id="goodsAmount"
                      class="price">{{ totalPrice }}</label> 元&nbsp;&nbsp;&nbsp;&nbsp;
                  </p>
                  <p>
                    运费：￥
                    <label
                      id="expressFee"
                      class="price">{{ orderForm.expressMoment }}</label> 元
                  </p>
                  <p class="txt-box">
                    应付总金额：￥
                    <label
                      id="totalAmount"
                      class="price">{{ getTotalPrice }}</label>
                  </p>
                  <p class="btn-box">
                    <router-link
                      class="btn button"
                      to="/shopcart">返回购物车</router-link>
                    <input
                      id="btnSubmit"
                      name="btnSubmit"
                      type="submit"
                      value="确认提交"
                      class="btn submit"
                      @click="goToOrder">
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
    // import VDistpicker from 'v-distpicker';
    import {getLocalGoods} from '../../common/localStorageHelper.js';
    export default {
        data () {
            var checkMobile = (rule, value, callback) => {
                if (/^1[3|4|5|8][0-9]\d{4,8}$/.test(value)) {
                    callback();
                } else {
                    callback(new Error('手机号码不正确'));
                }
            };
            return {
                totalCount: 0,
                totalPrice: 0,
                goodsList: [],
                orderForm: {
                    accept_name: '123',
                    address: '123',
                    mobile: '13111111111',
                    email: '',
                    post_code: '',
                    payment_id: '6',
                    express_id: '1',
                    expressMoment: 20,
                    message: '请快点发货',
                    goodsAmount: 0,
                    goodsids: '',
                    cargoodsobj: {},
                    area: {
                        province: {
                            code: '140000',
                            value: '山西省'
                        },
                        city: {
                            code: '140100',
                            value: '太原市'
                        },
                        area: {
                            code: '140106',
                            value: '迎泽区'
                        }
                    }
                },
                rules: {
                    accept_name: [
                        { required: true, message: '请输入收货人姓名', trigger: 'blur' }
                    ],
                    area: [
                        { required: true, message: '请输入所属地区', trigger: 'blur' }
                    ],
                    address: [
                        { required: true, message: '请输入详细地址', trigger: 'blur' }
                    ],
                    mobile: [
                        { required: true, message: '请输入手机号码', trigger: 'blur' },
                        { validator: checkMobile, trigger: 'blur' }
                    ]
                }
            };
        },
        // components: {
        //     VDistpicker
        // },
        computed: {
            getTotalPrice () {
                return this.totalPrice + this.orderForm.expressMoment;
            }
        },
        created () {
            this.getGoodsListData();
        },
        methods: {
            getGoodsListData () {
                const url = `site/validate/order/getgoodslist/${this.$route.query.ids}`;
                this.orderForm.goodsids = this.$route.query.ids;
                const localGoods = getLocalGoods();
                let tempTotalCount = 0;
                let tempTotalPrice = 0;
                const obj = {};
                this.$axios.get(url).then(res => {
                    res.data.message.forEach(item => {
                        item.buycount = localGoods[item.id];
                        obj[item.id] = item.buycount;
                        tempTotalCount += item.buycount;
                        tempTotalPrice += item.buycount * item.sell_price;
                    });
                    this.totalCount = tempTotalCount;
                    this.totalPrice = tempTotalPrice;
                    this.orderForm.goodsAmount = tempTotalPrice;
                    this.goodsList = res.data.message;
                    this.orderForm.cargoodsobj = obj;
                }, err => {
                    console.log(err);
                });
            },
            expressChange (label) {
                switch (label) {
                case '1':
                    this.orderForm.expressMoment = 20;
                    break;
                case '2':
                    this.orderForm.expressMoment = 10;
                    break;
                case '3':
                    this.orderForm.expressMoment = 8;
                    break;
                }
            },
            goToOrder () {
                this.$refs.orderForm.validate((valid) => {
                    if (valid) {
                        const url = `site/validate/order/setorder`;
                        this.$axios.post(url, this.orderForm).then(res => {
                            if (res.data.status === 0) {
                                this.$router.push(`/pay/${res.data.message.orderid}`);
                                const idsArr = this.$route.query.ids.split(',');
                                idsArr.forEach(id => {
                                    this.$store.commit('deleteGoods', id);
                                });
                            }
                        });
                    } else {
                        console.log('error submit!!');
                    }
                });
            }
        }
    };
</script>
