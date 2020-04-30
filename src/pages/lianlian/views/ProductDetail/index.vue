<template>
    <div class="TK-activity-detail">
        <div class="content" ref="actDetail">
            <Swipe :autoplay="3000" indicator-color="white">
                <SwipeItem v-for="item in detail.loopImgs" :key="item.url">
                    <img :src="item" alt="" class="swipe-image">
                </SwipeItem>
            </Swipe>
            <div class="product-info">
                <div class="title">
                    {{detail.title}}
                </div>
                <div class="price-container">
                    <p class="order-price">{{detail.salePriceStr}}</p>
                    <p class="price">{{detail.originPriceStr}}</p>
                </div>
                <div class="sale-container">
                    <div class="sale-amount">已售：{{detail.saleAmount}}</div>
                    <div class="stock-amount">库存：{{detail.stockAmount}}</div>
                </div>
            </div>
            <div class="shop-info">
                <div class="section-name">地址</div>
                <div class="shop-item van-hairline--bottom" v-for="item in detail.shops" :key="item.id">
                    <i class="iconfont icon-address"/>
                    <div>
                        <p class="name">{{item.name}}</p>
                        <p class="address">{{item.address}}</p>
                    </div>
                </div>
            </div>
            <iframe
                    id="myIframe"
                    marginwidth=0
                    marginheight=0
                    width="100%"
                    height="500%"
                    frameborder="no"
                    scrolling="no"
            ></iframe>
            <div class="recommend-info">
                <div class="section-name">更多商品</div>
                <List
                        :finished="finished"
                        finished-text="没有更多了"
                >
                    <div style="display: flex;flex-wrap: wrap;">
                        <ActivityItem
                                :detail="item"
                                v-for="item in table"
                                :key="item.id"
                        />
                    </div>
                </List>
            </div>
        </div>
        <div class="common-btn is-sold-out" v-if="detail.isSoldOut">已售馨</div>
        <div class="common-btn" @click="handleClick" v-else>前往购买</div>
        <i class="iconfont icon-fanhui" @click="$router.replace({path:'/'})"></i>
    </div>
</template>

<script type="text/ecmascript-6">
    import {Swipe, SwipeItem, List} from 'vant'
    import {getProductDetail, getProducts} from './service'
    import ActivityItem from './components/ActivityItem'

    export default {
        created() {
            this.initDetail()
            this.initTable()
        },
        watch: {
            $route: {
                deep: true,
                handler() {
                    this.initDetail()
                }
            }
        },
        components: {
            Swipe,
            SwipeItem,
            ActivityItem,
            List
        },
        data() {
            return {
                // productHtmlUrl:null,
                detail: {
                    loopImgs: [],
                    shops: []
                },
                table: [],
                finished: true
            }
        },
        methods: {
            /**
             * 初始化表格数据
             */
            async initTable() {
                let {id} = this.$route.query
                let table = await getProducts()
                this.table = table.filter(item => item.id !== Number(id))
            },
            initDetail() {
                let {id} = this.$route.query
                this.$showLoading()
                getProductDetail(id).then(res => {
                    this.detail = res.bizProduct
                    this.$nextTick(() => {
                        let ifm = document.getElementById("myIframe");
                        ifm.src = res.productHtmlUrl
                        this.$refs.actDetail.scrollTop = 0
                        this.$hideLoading()
                    })
                })
            },
            handleClick() {
                let {id} = this.$route.query
                window.location.href = `https://cd-nt.lianlianlvyou.com/?s=oBoII1ka2t_jZ5WamUkRWdV3p7VI&v=237&i=wx75e021023a75a274&a=66495735#/zhoubian/${id}`
            }
        }
    }
</script>

<style lang="less" scoped>

    .TK-activity-detail {
        display: flex;
        flex-direction: column;
        height: 100vh;
        overflow: hidden;
        background-color: #fff;
        .icon-fanhui {
            display: block;
            position: fixed;
            bottom: 6rem;
            right: 2rem;
            color: rgba(48, 48, 48, 0.82);
            font-size: 4rem;
        }
        .content {
            flex: 1;
            overflow-y: auto;
            .swipe-image {
                display: block;
                width: 100%;
            }
        }
    }

    .section-name {
        position: relative;
        padding: 1rem;
        font-size: 1.8rem;
        color: #666;
        &::after {
            left: 0;
            top: 50%;
            transform: translateY(-50%);
            position: absolute;
            width: 3px;
            background-color: #59bf30;
            height: 1.5rem;
            content: "";
        }
    }

    .recommend-info {
        margin-top: 20px;
        padding: 0 16px;
    }

    .shop-info {
        padding: 0 16px;
        .shop-item {
            padding: .5rem 0;
            display: flex;
            align-items: center;
            .icon-address {
                font-size: 2.2rem;
                color: #ff791a;
                margin-right: 1rem;
            }
            .name {
                color: #333;
                font-size: 1.6rem;
            }
            .address {
                color: #999;
                font-size: 1.3rem;
            }
        }
    }

    .product-info {
        padding: 16px;
        box-sizing: border-box;

        .title {
            font-size: 1.7rem;
            line-height: 1.5;
            color: #333;
            margin-bottom: 10px;
            width: 100%;
            word-break: break-all;
        }

        .price-container {
            margin-bottom: .5rem;
            display: flex;
            align-items: baseline;
            .order-price {
                color: #ff3a00;
                font-size: 2.4rem;
                margin-right: 10px;
            }

            .price {
                color: #b1b1b1;
                font-size: 1.5rem;
                text-decoration: line-through;
            }
        }

        .sale-container {
            color: #b1b1b1;
            font-size: 1.5rem;
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
    }

    .common-btn {
        letter-spacing: .5rem;
        cursor: pointer;
        border-radius: .5rem;
        background-color: #00b300;
        color: #fff;
        text-align: center;
        font-size: 1.5rem;
        height: 5rem;
        line-height: 5rem;
    }

    .is-sold-out {
        background-color: #ccc;
        cursor: not-allowed;
    }
</style>
