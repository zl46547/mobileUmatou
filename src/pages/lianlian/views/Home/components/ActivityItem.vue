<template>
    <div class="activity-item" @click="toDetail">
        <img :src="detail.faceImg" alt="商品"/>
        <div class="product-detail">
            <div class="title van-hairline--bottom">
                {{detail.title}}
            </div>
            <div class="content-bottom">
                <div class="content-bottom-price">
                    <div class="current-price">{{detail.salePriceStr}}</div>
                    <div class="origin-price">{{detail.originPriceStr}}</div>
                </div>
                <span>销售量：{{detail.saleAmount}}</span>
            </div>
        </div>
    </div>
</template>

<script>

    import {SCROLL_TOP} from '../../../vuex/types'

    export default {
        props: {
            detail: {
                require: true
            },
            userType: {
                type: String
            }
        },
        methods: {
            toDetail() {
                let scrollTop = document.getElementsByClassName('content')[0].scrollTop
                this.$store.commit(SCROLL_TOP, scrollTop)
                this.$router.push({
                    name: '商品详情',
                    query: {
                        id: this.detail.id
                    }
                })
            }
        }
    }
</script>

<style lang="less" scoped>
    @import "../../../../../less/variables";

    .van-dialog {
        background-color: transparent;
        border-radius: 8px;
        margin-top: 50%;
        transform: translate(-50%, -70%);
    }

    .wrapper {
        .close-btn {
            margin-top: 1rem;
            text-align: center;
            font-size: 3rem;
            color: #fff;
        }
    }

    .activity-item {
        margin-top: 1rem;
        background-color: #fff;
        box-sizing: border-box;
        width: 100%;
        border-radius: 1rem;

        img {
            border-radius: 8px 8px 0 0;
            width: 100%;
        }

        .product-detail {
            padding: 10rem/@baseFontSize 20rem/@baseFontSize;

            .title {
                width: 100%;
                box-sizing: border-box;
                overflow: hidden;
                font-size: 28rem/@baseFontSize;
                word-break: break-all;
                padding: .5rem;
            }

            .content-bottom {
                padding: 1rem;
                display: flex;
                align-items: center;
                justify-content: space-between;
                font-size: 28rem/@baseFontSize;;

                .content-bottom-price {
                    display: flex;
                    align-items: center;

                    .current-price {
                        color: @priceColor;
                        font-size: 32rem/@baseFontSize;
                    }

                    .origin-price {
                        font-size: 24rem/@baseFontSize;
                        text-decoration: line-through;
                        margin-left: 1rem;
                    }
                }
            }
        }
    }
</style>
