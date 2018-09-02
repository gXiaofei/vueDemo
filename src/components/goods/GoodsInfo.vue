<template>
  <div>
    <div class="section">
      <div class="location">
        <span>当前位置：</span>
        <a href="/index.html">首页</a> &gt;
        <a href="/goods.html">购物商城</a>
        <a href="/goods/42/1.html">商品详情</a>
      </div>
    </div>
    <div class="section">
      <div class="wrapper clearfix">
        <div class="wrap-box">
          <div
            v-if="goods.goodsinfo"
            class="left-925">
            <div class="goods-box clearfix">
              <div class="pic-box"/>
              <div class="goods-spec">
                <h1>{{ goods.goodsinfo.title }}</h1>
                <p class="subtitle">{{ goods.goodsinfo && goods.goodsinfo.sub_title }}</p>
                <div class="spec-box">
                  <dl>
                    <dt>货号</dt>
                    <dd id="commodityGoodsNo">{{ goods.goodsinfo.goods_no }}</dd>
                  </dl>
                  <dl>
                    <dt>市场价</dt>
                    <dd>
                      <s id="commodityMarketPrice">¥{{ goods.goodsinfo.market_price }}</s>
                    </dd>
                  </dl>
                  <dl>
                    <dt>销售价</dt>
                    <dd>
                      <em
                        id="commoditySellPrice"
                        class="price">¥{{ goods.goodsinfo.sell_price }}</em>
                    </dd>
                  </dl>
                </div>
                <div class="spec-box">
                  <dl>
                    <dt>购买数量</dt>
                    <el-input-number
                      v-model="buyCount"
                      :min="1"
                      :max="goods.goodsinfo.stock_quantity"
                    />
                  </dl>
                  <span class="stock-txt">
                    库存
                    <em id="commodityStockNum">{{ goods.goodsinfo.stock_quantity }}</em>件
                  </span>

                  <dl>
                    <dd>
                      <div
                        id="buyButton"
                        class="btn-buy">
                        <button
                          onclick="cartAdd(this,'/',1,'/shopping.html');"
                          class="buy">立即购买</button>
                        <button
                          onclick="cartAdd(this,'/',0,'/cart.html');"
                          class="add">加入购物车</button>
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div
              id="goodsTabs"
              class="goods-tab bg-wrap">
              <Affix>
                <div
                  id="tabHead"
                  class="tab-head"
                  style="position: static; top: 517px; width: 925px;">
                  <ul>
                    <li>
                      <a
                        :class="{selected: !isShowComment}"
                        href="javascript:;"
                        @click="isShowComment = false">商品介绍</a>
                    </li>
                    <li>
                      <a
                        :class="{selected: isShowComment}"
                        href="javascript:;"
                        @click="isShowComment = true">商品评论</a>
                    </li>
                  </ul>
                </div>
              </Affix>
              <div
                v-show="!isShowComment"
                class="tab-content entry"
                style="display: block;"
                v-html="goods.goodsinfo.content"/>
              <div
                v-show="isShowComment"
                class="tab-content"
                style="display: block;">
                <div class="comment-box">
                  <div
                    id="commentForm"
                    name="commentForm"
                    class="form-box">
                    <div class="avatar-box">
                      <i class="iconfont icon-user-full"/>
                    </div>
                    <div class="conn-box">
                      <div class="editor">
                        <textarea
                          id="txtContent"
                          ref="commenttxt"
                          name="txtContent"
                          sucmsg=" "
                          datatype="*10-1000"
                          nullmsg="请填写评论内容！"/>
                        <span class="Validform_checktip"/>
                      </div>
                      <div class="subcon">
                        <input
                          id="btnSubmit"
                          name="submit"
                          type="submit"
                          value="提交评论"
                          class="submit"
                          @click="submitComment">
                        <span class="Validform_checktip"/>
                      </div>
                    </div>
                  </div>
                  <ul
                    id="commentList"
                    class="list-box">
                    <p
                      v-if="commentsList.totalcount === 0"
                      style="margin: 5px 0px 15px 69px; line-height: 42px; text-align: center; border: 1px solid rgb(247, 247, 247);">暂无评论，快来抢沙发吧！</p>
                    <li
                      v-for="item in commentsList.message"
                      :key="item.id">
                      <div class="avatar-box">
                        <i class="iconfont icon-user-full"/>
                      </div>
                      <div class="inner-box">
                        <div class="info">
                          <span>匿名用户</span>
                          <span>{{ item.add_time | time('YYYY-MM-DD HH-mm-ss') }}</span>
                        </div>
                        <p>{{ item.content }}</p>
                      </div>
                    </li>

                  </ul>
                  <div
                    class="page-box"
                    style="margin: 5px 0px 0px 62px;">
                    <div
                      id="pagination"
                      class="digg">
                      <el-pagination
                        :current-page="pageIndex"
                        :page-sizes="[2, 5, 10, 20]"
                        :page-size="pageSize"
                        :total="commentsList.totalcount"
                        layout="total, sizes, prev, pager, next, jumper"
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"/>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="left-220">
            <div class="bg-wrap nobg">
              <div class="sidebar-box">
                <h4>推荐商品</h4>
                <ul class="side-img-list">
                  <li
                    v-for="item in goods.hotgoodslist"
                    :key="item.id">
                    <div class="img-box">
                      <router-link
                        :to="'/goodsinfo/'+item.id"
                        class="">
                        <img :src="item.img_url">
                      </router-link>
                    </div>
                    <div class="txt-box">
                      <router-link
                        :to="'/goodsinfo/'+item.id"
                        class="">{{ item.title }}</router-link>
                      <span>{{ item.add_time | time }}</span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    import { Affix } from 'iview';
    export default {
        components: {
            Affix
        },
        data () {
            return {
                goods: {},
                buyCount: 1,
                isShowComment: false,
                pageIndex: 1,
                pageSize: 2,
                commentsList: {}
            };
        },
        watch: {
            //  利用watch监控路径的变化
            $route: function (newValue) {
                // 路由变化获取对应的商品详情
                this.getGoodsData();
                // 路由变化重新获取对应的评论信息
                this.pageIndex = 1;
                this.pageSize = 2;
                this.getCommentsData();
            }
        },
        created () {
            // 获取推荐商品
            this.getGoodsData();
            // 获取评论
            this.getCommentsData();
        },
        methods: {
            // 获取商品详情
            getGoodsData () {
                this.$axios.get('site/goods/getgoodsinfo/' + this.$route.params.id).then(res => {
                    this.goods = res.data.message;
                }, err => {
                    console.log(err);
                });
            },
            // 获取评论数据
            getCommentsData () {
                var url = `site/comment/getbypage/goods/${this.$route.params.id}?pageIndex=${this.pageIndex}&pageSize=${this.pageSize}`;

                this.$axios.get(url).then(res => {
                    this.commentsList = res.data;
                }, err => {
                    console.log(err);
                });
            },
            handleSizeChange (pageSize) {
                this.pageSize = pageSize;
                this.pageIndex = 1;
                this.getCommentsData();
            },
            handleCurrentChange (pageIndex) {
                this.pageIndex = pageIndex;
                this.getCommentsData();
            },
            // 提交评论
            submitComment () {
                var url = `site/validate/comment/post/goods/${this.$route.params.id}`;
                if (this.$refs.commenttxt.value.trim() === '') {
                    this.$message({
                        message: '请填写内容',
                        type: 'warning'
                    });
                    return;
                }
                this.$axios.post(url, {
                    commenttxt: this.$refs.commenttxt.value
                }).then(res => {
                    this.$message({
                        message: '评论成功',
                        type: 'success'
                    });
                    this.$refs.commenttxt.value = '';
                    this.pageIndex = 1;
                    this.getCommentsData();
                }, err => {
                    console.log(err);
                });
            }

        }
    };
</script>

<style scoped>

</style>
