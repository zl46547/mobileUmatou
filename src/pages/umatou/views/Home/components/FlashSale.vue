<template>
    <div id="flashSale">
        <div class="flashSale-header">
            <img src="../../../../../assets/images/timeoutBuy.png" alt="限时抢购">
            <CountDown :time="time">
                <template v-slot="timeData">
                    <span class="item">{{ timeData.hours | formatTime }}</span>:
                    <span class="item">{{ timeData.minutes | formatTime }}</span>:
                    <span class="item">{{ timeData.seconds | formatTime }}</span>
                </template>
            </CountDown>
        </div>
        <div class="flashSale-list">
            <div class="scroll-div" v-if="flashSaleData">
                <div class="scroll-div-item"
                     v-for="item in flashSaleData.FlashSaleProducts"
                     :key="item.id"
                     @click="goToDetail(item)"
                >
                    <img v-lazy="'http://picpro-sz.34580.com/sz/ImageUrl/'+item.PictureId+'/200.jpeg'"/>
                    <div class="product-name">{{item.ProductName}}</div>
                    <div class="price">
                        <span class="flashSale-list-price">￥{{item.PeriodMoney}}</span>
                        <span class="flashSale-list-unit">/{{item |formatUnit}}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import {getFlashSale} from '../service'
    import {SCROLL_TOP} from '../../../vuex/types'
    import {CountDown} from 'vant'

    export default {
        data() {
            return {
                flashSaleData: null,
                time: 30 * 60 * 60 * 1000
            }
        },
        components: {
            CountDown
        },
        created() {
            this.getFlashSaleData()
        },
        filters:{
            formatUnit(item) {
                if (item.Standard) {
                    return item.Unit
                }
                return `500${item.Unit}`
            },
            formatTime(time) {
                return time<10?`0${time}`:time
            },
        },
        methods: {
            /**
             * 获取限时抢购数据
             */
            getFlashSaleData() {
                getFlashSale().then((res) => {
                    this.flashSaleData = res
                }).catch((error) => {
                    console.log(error)
                })
            },
            onChange(e) {
                this.timeData = e.detail
            },
            /**
             * 跳转商品详情页面
             * @param val
             */
            goToDetail(val) {
                this.$store.commit(SCROLL_TOP, this.$parent.$refs.content.scrollTop)
                this.$router.push({name: '商品详情', params: {productId: val.ProductId}})
            }
        }
    }
</script>

<style lang="less" scoped>
    @import "../../../../../less/variables";

    #flashSale {
        background-color: #fff;
        .flashSale-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0 3%;
            img {
                display: block;
                width: 134rem/@baseFontSize;
            }
            .item {
                display: inline-block;
                width: 2.2rem;
                margin-right: 5px;
                color: #fff;
                font-size: 12px;
                text-align: center;
                background-color: #333;
                border-radius: 3px;
            }
        }

        .flashSale-list {
            .scroll-div {
                white-space: nowrap;
                display: flex;
                overflow-x: scroll;
                overflow-y: hidden;
                .scroll-div-item {
                    display: inline-block;
                    margin: 25rem/@baseFontSize 26rem/@baseFontSize;
                    cursor: pointer;
                    width: 180rem/@baseFontSize;
                    img {
                        width: 180rem/@baseFontSize;
                        height: 180rem/@baseFontSize;
                        display: block;
                        margin-bottom: 10rem/@baseFontSize;
                    }
                    .product-name {
                        text-align: center;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                        font-size: 30rem/@baseFontSize;
                    }
                    .price {
                        text-align: center;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                        margin-top: 5rem/@baseFontSize;
                        .flashSale-list-price {
                            color: @priceColor;
                            font-size: 30rem/@baseFontSize;
                        }
                        .flashSale-list-unit {
                            color: rgb(150, 150, 150);
                            font-size: 24rem/@baseFontSize;
                        }
                    }
                }
            }
        }
    }
</style>
