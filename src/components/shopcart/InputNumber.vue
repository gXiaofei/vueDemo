<template>
  <div>
    <div class="left">-</div>
    <div class="middle">{{ count }}</div>
    <div class="right">+</div>
  </div>
</template>
<script>
    export default {
        props: {
            initCount: {
                type: Number,
                default: 0
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
    }
</style>
