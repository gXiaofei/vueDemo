<template>
  <div><div class="section">
    <div class="location">
      <span>当前位置：</span>
      <a href="/index.html">首页</a> &gt;
      <a href="javascript:;">支付中心</a>
    </div>
  </div>
    <div class="section">
      <div class="wrapper">
        <div class="bg-wrap">
          <div class="nav-tit pay">
            <a
              href="javascript:;"
              class="selected">支付中心</a>
          </div>
          <div class="form-box payment">
            <div class="el-row">
              <div class="el-col el-col-16">
                <div class="el-row">
                  <div class="el-col el-col-12">
                    <dl class="form-group">
                      <dt>订 单 号：</dt>
                      <dd>{{ orderData.order_no }}</dd>
                    </dl>
                  </div>
                  <div class="el-col el-col-12">
                    <dl class="form-group">
                      <dt>收货人姓名：</dt>
                      <dd>{{ orderData.accept_name }}</dd>
                    </dl>
                  </div>
                </div>
                <div class="el-row">
                  <div class="el-col el-col-12">
                    <dl class="form-group">
                      <dt>送货地址：</dt>
                      <dd>{{ orderData.area }}
                      </dd>
                    </dl>
                  </div>
                  <div class="el-col el-col-12">
                    <dl class="form-group">
                      <dt>手机号码：</dt>
                      <dd>{{ orderData.mobile }}</dd>
                    </dl>
                  </div>
                </div>
                <div class="el-row">
                  <div class="el-col el-col-12">
                    <dl class="form-group">
                      <dt>支付金额：</dt>
                      <dd>{{ orderData.order_amount }} 元</dd>
                    </dl>
                  </div>
                  <div class="el-col el-col-12">
                    <dl class="form-group">
                      <dt>支付方式：</dt>
                      <dd>在线支付</dd>
                    </dl>
                  </div>
                </div>
                <div class="message">
                  <span>备&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注：</span>
                  <span>{{ orderData.message }}</span>
                </div>
              </div>
              <div class="el-col el-col-8">
                <img
                  id="imgLogo"
                  src="../../../static/site/img/1.jpg"
                  hidden>
                <div id="container2">
                  <canvas
                    width="300"
                    height="300"/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</div></template>

<script>
    import '../../../static/site/js/qrcode/qrcode';
    export default {
        data () {
            return {
                orderData: {}
            };
        },
        created () {
            this.getOrder();
        },
        updated () {
            // this.$jq('#container2').erweima({
            //     text: 'https://www.baidu.com',
            //     mode: 4,
            //     mSize: 35,
            //     image: this.$jq('#imgLogo')[0]
            // });
        },
        mounted () {
            // 异步更新队列
            this.$nextTick(function () {
                // console.log(this.$el.textContent); // => '更新完成'
                this.$jq('#container2').erweima({
                    text: 'https://www.baidu.com',
                    mode: 4,
                    mSize: 35,
                    image: this.$jq('#imgLogo')[0]
                });
            });
        },
        methods: {
            getOrder () {
                const url = `site/validate/order/getorder/${this.$route.params.orderId}`;
                this.$axios.get(url).then(res => {
                    if (res.data.status === 0) {
                        this.orderData = res.data.message[0];
                    }
                });
            }
        }
    };
</script>
