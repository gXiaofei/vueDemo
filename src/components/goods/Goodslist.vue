<template>
  <div>
    <div class="section">
      <div class="location">
        <span>当前位置：</span>
        <a
          href="#/"
          class="router-link-active">首页</a> &gt;
        <a
          href="#/site/goodslist"
          class="router-link-exact-active router-link-active">购物商城</a>
      </div>
    </div>
    <div class="section">
      <div class="wrapper">
        <div class="wrap-box">
          <div
            class="left-220"
            style="margin: 0px;">
            <div class="banner-nav">
              <ul>
                <li
                  v-for="item in goodsData.catelist"
                  :key="item.id">
                  <h3>
                    <i class="iconfont icon-arrow-right"/>
                    <span>{{ item.title }}</span>
                    <p>
                      <span
                        v-for="subitem in item.subcates"
                        :key="subitem.id">
                        {{ subitem.title }}&nbsp;
                      </span>

                    </p>
                  </h3>
                  <div class="item-box">
                    <dl>
                      <dt>
                        <a href="/goods/40.html">{{ item.title }}</a>
                      </dt>
                      <dd>
                        <a
                          v-for="subitem in item.subcates"
                          :key="subitem.id"
                          href="/goods/43.html">{{ subitem.title }}</a>
                      </dd>
                    </dl>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <!--幻灯片-->
          <div class="left-705">
            <div class="banner-img">
              <div
                id="focus-box"
                class="focus-box">
                <el-carousel
                  :interval="5000"
                  height="341px"
                  arrow="always">
                  <el-carousel-item
                    v-for="item in goodsData.sliderlist"
                    :key="item.id"
                  >
                    <img
                      :src="item.img_url"
                      style="width: 100%;height:100%;"
                      draggable="false">
                  </el-carousel-item>
                </el-carousel>
              </div>

            </div>
          </div>
          <!--/幻灯片-->
          <div class="left-220">
            <ul class="side-img-list">
              <li
                v-for="(item, index) in goodsData.toplist"
                :key="item.id">
                <div class="img-box">
                  <label>{{ index }}</label>
                  <img :src="item.img_url">
                </div>
                <div class="txt-box">
                  <a href="/goods/show-98.html">{{ item.title }}</a>
                  <span>{{ item.add_time | timeFilter }}</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <!-- 商品列表 -->
    <div
      v-for="item in goodsList"
      :key="item.level1cateid"
      class="section">
      <div class="main-tit">
        <h2>{{ item.catetitle }}</h2>
        <p>
          <a
            v-for="subcate in item.level2catelist"
            :key="subcate.subcateid"
            href="/goods/43.html">{{ subcate.subcatetitle }}</a>
          <a href="/goods/40.html">更多
            <i>+</i>
          </a>
        </p>
      </div>
      <div class="wrapper clearfix">
        <div class="wrap-box">
          <ul class="img-list">
            <li
              v-for="data in item.datas"
              :key="data.artID">
              <router-link
                :to="'/goodsinfo/'+data.artID"
                class="">
                <div class="img-box">
                  <img v-lazy="data.img_url">
                </div>
                <div class="info">
                  <h3>{{ data.artTitle }}</h3>
                  <p class="price">
                  <b>{{ data.sell_price }}</b>元</p>
                  <p>
                    <strong>库存 {{ item.stock_quantity }}</strong>
                    <span>市场价：
                      <s>{{ data.market_price }}</s>
                    </span>
                  </p>
                </div>
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
    import moment from 'moment';
    export default {
        name: 'Goodslist',
        filters: {
            timeFilter: function (time) {
                if (!time) return '';
                return moment(time).format('YYYY-MM-DD');
            }
        },
        data () {
            return {
                goodsData: {}, // 头部数据
                goodsList: [] // 列表数据
            };
        },
        created () {
            // 获取商品头部
            this.getGoodsData();
            // 获取商品列表
            this.getGoodsList();
        },
        methods: {
            // 获取头部商品数据
            getGoodsData () {
                const url = '/site/goods/gettopdata/goods';
                this.$axios.get(url).then(res => {
                    this.goodsData = res.data.message;
                    console.log(this.goodsData);
                }, err => {
                    console.log(err);
                });
            },
            // 获取商品列表
            getGoodsList () {
                const url = '/site/goods/getgoodsgroup';
                this.$axios.get(url).then(res => {
                    this.goodsList = res.data.message;
                    console.log(this.goodsList);
                }, err => {
                    console.log(err);
                });
            }
        }
    };
</script>

<style scoped>
</style>
