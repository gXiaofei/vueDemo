<template>
  <div>
    <div
      class="left"
      @click="substrict">-</div>
    <div class="middle">{{ count }}</div>
    <div
      class="right"
      @click="add">+</div>
  </div>
</template>
<script>
    export default {
        props: {
            initCount: {
                type: Number,
                default: 0
            },
            goodsId: {
                type: Number,
                required: true
            }
        },
        data () {
            return {
                count: 1
            };
        },
        created () {
            this.count = this.initCount;
            console.log(this.initCount);
        },
        methods: {

            add () {
                this.count++;
                this.notify();
            },

            substrict () {
                if (this.count <= 1) return;

                this.count--;
                this.notify();
            },

            notify () {
                const goods = {
                    goodsId: this.goodsId,
                    count: this.count
                };
                // 利用$emit来触发父组件自定义的事件
                this.$emit('numberChange', goods);
            }

        }
    };
</script>

<style scoped>
    .left,.middle,.right{
        display: inline-block;
        width: 30px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        border: 1px solid rgba(92, 92, 92, 0.3);
        cursor: pointer;
    }
</style>
