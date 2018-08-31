<template>
  <div id="app">
    <!-- 头部 -->
    <div class="header">
      <!-- 1.0 导航栏头部 -->
      <div class="head-top">
        <div class="section">
          <div class="left-box">
            <span>商城</span>
            <a
              target="_blank"
              href="#"/>
            <a
              target="_blank"
              href="#"/>
          </div>
          <div
            id="menu"
            class="right-box">
            <span style="display: none;">
              <a
                href=""
                class="">登录</a>
              <strong>|</strong>
              <a
                href=""
                class="">注册</a>
              <strong>|</strong>
            </span>
            <span>
              <a
                href=""
                class="">会员中心</a>
              <strong>|</strong>
              <a>退出</a>
              <strong>|</strong>
            </span>
            <router-link
              to="/shopcart"
              class="">
              <i class="iconfont icon-cart"/>购物车(
              <span id="shoppingCartCount">
                <span>4</span>
            </span>)</router-link>
          </div>
        </div>
      </div>

      <!-- 2.0 导航条 -->
      <div class="head-nav">
        <div class="section">
          <div
            id="menu2"
            class="nav-box menuhd">
            <ul>
              <li class="index">
                <a
                  href="#"
                  class="">
                  <span
                    class="out"
                    style="top: 0px;">首页</span>
                </a>
              </li>
              <li class="news">
                <a
                  href="#"
                  class="">
                  <span
                    class="out"
                    style="top: 0px;">每日精选</span>
                </a>
              </li>
              <li class="photo">
                <a
                  href="#"
                  class="">
                  <span
                    class="out"
                    style="top: 0px;">秒杀专区</span>
                </a>
              </li>
              <li class="video">
                <a
                  href="#"
                  class="">
                  <span
                    class="out"
                    style="top: 0px;">黑马超市</span>
                </a>
              </li>
              <li class="down">
                <a
                  href="#"
                  class="">
                  <span
                    class="out"
                    style="top: 0px;">会员权益</span>
                </a>
              </li>
              <li class="goods">
                <router-link
                  to="/goodslist"
                  class="router-link-exact-active ">
                  <span
                    class="out"
                    style="top: 0px;">购物商城</span>
                </router-link>
              </li>
            </ul>
          </div>
          <div class="search-box">
            <div class="input-box">
              <input
                id="keywords"
                name="keywords"
                type="text"
                onkeydown="if(event.keyCode==13){};"
                placeholder="输入关健字"
                x-webkit-speech="">
            </div>
            <a href="javascript:;">
              <i class="iconfont icon-search"/>
            </a>
          </div>
        </div>
      </div>
    </div>
    <!-- 头部end -->

    <router-view />

    <!-- 底部 -->
    <div class="footer">
      <div class="section">
        <div class="foot-nav">
          <a href="">关于我们</a>
          <strong>|</strong>
          <a href="">联系我们</a>
          <strong>|</strong>
          <a href="">联系客服</a>
          <strong>|</strong>
          <a href="">合作招商</a>
          <strong>|</strong>
          <a href="">商家帮助</a>
          <strong>|</strong>
          <a href="">营销中心</a>
          <strong>|</strong>
          <a href="">隐私政策</a>
        </div>
        <div class="foot-box">
          <div class="copyright">
            <p>版权所有 黑马买买买 </p>
            <p>公司地址： 联系电话：</p>
            <p class="gray">Copyright © 2009-2018 itcast Corporation,All Rights Reserved.</p>
          </div>
          <div class="service">
            <p>周一至周日 9:00-24:00</p>
            <a href="#">
            <i class="iconfont icon-phone"/>在线客服</a>
          </div>
        </div>
      </div>
    </div>
    <!-- 底部end -->
  </div>
</template>

<script>

    export default {
        name: 'App',
        data () {
            return {

            };
        },
        mounted () {
            const _this = this;
            // dom元素已经加载
            this.$jq(document).ready(function () {
                _this.$jq('#menu2 li a').wrapInner('<span class="out"></span>');
                _this.$jq('#menu2 li a').each(function () {
                    _this.$jq('<span class="over">' + _this.$jq(this).text() + '</span>').appendTo(this);
                });

                _this.$jq('#menu2 li a').hover(function () {
                    _this.$jq('.out', this).stop().animate({'top': '48px'}, 300); // move down - hide
                    _this.$jq('.over', this).stop().animate({'top': '0px'}, 300); // move down - show
                }, function () {
                    _this.$jq('.out', this).stop().animate({'top': '0px'}, 300); // move up - show
                    _this.$jq('.over', this).stop().animate({'top': '-48px'}, 300); // move up - hide
                });
            });
        }
    };
</script>

<style scope>
@import "../static/site/js/hoverNav20151228/css/style.css";
</style>
