<template>
    <div id="detail">
        <div class="detail-bar">
            <div class="item-detail-bar-block">
                <span class="flash-sale sale-container">
                    <span>券后价</span>
                    <span class="yen">¥</span>
                    <span class="sale-price">{{couponAmountAfter}}</span>
                </span>
                <span class="current-sale sale-container">
                    <span>现价</span>
                    <span class="yen">¥</span>
                    <span class="sale-price">{{productInfo.zk_final_price}}</span>
                </span>
            </div>
            <div class="item-detail-bar-block right">
                <span class="today-title">今日必推</span>
                <div class="countdown-wrap">
                    <span>距离结束</span>
                    <CountDown :time="time">
                        <template v-slot="timeData">
                            <span class="item">{{ timeData.hours | formatTime }}</span>:
                            <span class="item">{{ timeData.minutes | formatTime }}</span>:
                            <span class="item">{{ timeData.seconds | formatTime }}</span>
                        </template>
                    </CountDown>
                </div>
            </div>
        </div>
        <div class="title">{{productInfo.title}}</div>
        <div class="item-sem-wrap">
            <div class="item-sem-line">
                <i class="iconfont icon-coupon"></i>
                <div class="sem-group">
                    <span>优惠券</span>
                    <span class="cl-brand">20.0元</span>
                    <span class="use-condition">(满40.0)使用</span>
                </div>
            </div>
            <div class="item-sem-line">
                <i class="iconfont icon-commission"></i>
                <div class="sem-group">
                    <span>返利</span>
                    <span class="cl-brand">2元</span>
                </div>
            </div>
        </div>
        <div class="pannel-wrap">
            <div class="pannel-top">
                <img src="../../../../../assets/images/pannel-top-tag.png" />
                <span class="pannel-top-text">相似商品</span>
                <img src="../../../../../assets/images/pannel-top-tag.png" />
            </div>
            <div class="pannel-list">

            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import {CountDown} from 'vant'

    export default {
        props: {
            productInfo: {
                required: true,
                type: Object
            }
        },
        computed: {
            couponAmountAfter(){
                let {zk_final_price,coupon_amount} = this.productInfo
                return (zk_final_price - coupon_amount).toFixed(2)
            }
        },
        data() {
            return {
                time: 30 * 60 * 60 * 1000
            }
        },
        filters:{
            formatTime(time) {
                return time<10?`0${time}`:time
            }
        },
        components:{
            CountDown
        },
        methods: {
            a(){
                let a=1;
            }
        }
    }
</script>

<style lang="less" scoped>
    @import "../../../../../less/variables";

    #detail {
        .detail-bar{
            width: 100%;
            box-sizing: border-box;
            height: 6rem;
            background-image: url(../../../../../assets/images/detailBar.png);
            -webkit-background-size: cover;
            background-size: cover;
            background-repeat: no-repeat;
            background-position: center right;
            padding: 1rem;
            display: flex;
            align-items: center;
            justify-content: space-between;
            .item-detail-bar-block{
                >span{
                    display: block;
                }
                .sale-container{
                    font-size: 1rem;
                    .yen{
                        margin: 0 .5rem;
                    }
                }
                .flash-sale{
                    color: #fff;
                    .sale-price{
                        font-size: 1.6rem;
                    }
                }
                .current-sale{
                    color: #fff;
                    opacity: 0.62;
                    .sale-price{
                        text-decoration: line-through;
                    }
                }
            }
            .right{
                color: #D0021B;
                text-align: center;
                .today-title{
                    font-size: 1.6rem;
                }
                .countdown-wrap{
                    display: flex;
                    align-items: center;
                    >span{
                        margin-right: 6px;
                    }
                    .item {
                        display: inline-block;
                        line-height: 1.4;
                        width: 1.8rem;
                        margin-right: 2px;
                        color: #fff;
                        font-size: 1rem;
                        text-align: center;
                        background-color: #D0021B;
                        border-radius: 3px;
                    }
                }
            }
        }
        .title{
            padding: 1rem;
            color: #4a4a4a;
            font-size: 1.4rem;
        }
        .item-sem-wrap {
            padding: 1rem;
            background-color: #FAFAFA;
            font-size: 1.3rem;
            .item-sem-line{
                line-height: 1.3;
                display: flex;
                align-items: center;
                i{
                    margin-right: 1rem;
                    font-size: 1.8rem;
                }
                .sem-group{
                    .cl-brand{
                        color: #F50;
                        margin: 0 6px;
                    }
                    .use-condition{
                        color: #9B9B9B;
                    }
                }
            }
        }
        .pannel-wrap{
            background-color: #F2F2F2;
            .pannel-top{
                color: #F50;
                display: flex;
                justify-content: center;
                align-items: center;
                padding: 2rem;
            }
            img{
                display: block;
                width: 2rem;
                height: 1rem;
            }
            .pannel-top-text{
                margin: 0 10px;
                font-size: 1.6rem;
            }
        }
    }
</style>
