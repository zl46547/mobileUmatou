<template>
    <div class="advertise" v-if="topicInfo">
        <div class="content"
             ref="content"
             :style="{'background-color':bgColor}"
        >
            <div v-for="activityItem in topicInfo" :key="activityItem.uid">
                <img v-lazy="activityItem.picUrl"
                     alt="typeA图片"
                     v-if="activityItem.type === 'a'"
                     class="type-a"
                />
                <div class="type-b" v-if="activityItem.type === 'b'">
                    <div v-for="item in activityItem.list"
                         :key="item.index"
                         :style="{width:getTypeBWidth(activityItem)}"
                    >
                        <img v-lazy="item.picUrl"
                             alt="typeB图片"
                             @click="goTop(activityItem.list[0])"
                        />
                    </div>
                </div>
                <div v-if="activityItem.type === 'c'" class="type-c">
                    <div
                            class="type-c-content"
                            v-for="item in validateTypeC(activityItem.list)"
                            :key="item.index"
                            @click="goToDetail(item)"
                    >
                        <img v-lazy="item.entity.imgUrl" alt="typeC图片"/>
                        <p class="title">{{item.entity.name}}</p>
                        <div class="price">
                            <p class="newest-price">
                                <span>¥</span>
                                <span class="period-price">{{item.entity.periodPrice}}</span>
                                <span>/{{item.entity.unit}}</span>
                            </p>
                            <p class="default-price">
                                <span>¥</span>
                                <span class="shihang-price">{{item.entity.shiHangPrice}}</span>
                            </p>
                        </div>
                        <div class="add-cart-btn"
                             :style="{'background-color':activityItem.cartBgColor}"
                             @click.stop="addCart(item)">
                            加入购物车
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import {getTopicActivity, handleAddGoods} from './service'
    import utils from '../../../../util/common'

    export default {
        watch: {
            '$route': {
                handler() {
                    let {queryId} = this.$route.query
                    if (!queryId) {
                        return false
                    }
                    this.getTopicActivityData(queryId).then(() => {
                        let dom = this.$refs.content
                        utils.backToTop(dom)
                    })
                },
                immediate: true
            }
        },
        beforeDestroy() {
            this.topicInfo = []
        },
        data() {
            return {
                bgColor: null,
                scrollTop: 0,
                topicInfo: [],
                pictureData: ''
            }
        },
        methods: {
            validateTypeC(list) {
                return list.filter(item => item.entity)
            },
            getTypeBWidth({style, cols}) {
                if (cols === 3 && style === 2) {
                    return '33.33%'
                }

                if (cols === 2 && style === 2 ) {
                    return '50%'
                }

                return '100%'
            },
            /**
             * 获取主题活动信息
             * @param topicId 活动id
             */
            async getTopicActivityData(topicId) {
                let res = await getTopicActivity({topicId})
                if (res) {
                    let {topic_info: topicInfo, bg_color: bgColor} = res
                    this.topicInfo = topicInfo
                    this.bgColor = bgColor
                } else {
                    setTimeout(() => {
                        this.$router.go(-1)
                    }, 3000)
                }
            },
            /**
             * 跳转商品详情页
             */
            goToDetail({entity}) {
                if (entity && entity.productId) {
                    this.$router.push({
                        name: '商品详情',
                        params: {productId: entity.productId}
                    })
                }
            },
            /**
             * 回到顶部或跳转详情
             */
            goTop(activityItem) {
                switch (activityItem.linkType) {
                    case '5': {
                        let dom = this.$refs.content
                        utils.backToTop(dom)
                        break
                    }

                    case '4': {
                        let queryId = activityItem.linkTo.replace('https://wechatx.34580.com/topics/', '')
                        this.$router.push({
                            name: '专题',
                            query: {queryId}
                        })
                        break
                    }
                    case '0': {
                        break
                    }
                    default:
                        this.$router.push({
                            name: '商品详情',
                            params: {productId: activityItem.linkTo}
                        })
                }
            },
            /**
             * 加入购物车
             */
            addCart(product) {
                let productId = product.entity.productId
                handleAddGoods(productId).then(res => {
                    if (res) {
                        this.count = res.count
                    }
                })
            }
        }
    }
</script>

<style lang="less" scoped>
    @import "../../../../less/variables";

    .advertise {
        overflow: hidden;

        .content {
            height: 100vh;
            overflow: auto;

            &::-webkit-scrollbar {
                display: none;
            }
        }

        .type-a {
            width: 100%;
            display: block;
        }

        .type-b {
            display: flex;
            flex-wrap: wrap;
            cursor: pointer;

            img {
                width: 100%;
            }
        }

        .type-c {
            display: flex;
            align-items: center;
            justify-content: flex-start;
            flex-wrap: wrap;
            margin: 0.5rem;

            .type-c-content {
                box-sizing: border-box;
                width: 33.33%;
                padding: 0.5rem 0.2rem;
                cursor: pointer;

                img {
                    display: block;
                    width: 100%;
                }
            }
        }

        .title {
            background-color: #fff;
            font-size: 1.5rem;
            padding: .8rem .5rem 0;
            text-overflow: ellipsis;
            box-sizing: border-box;
            width: 100%;
            overflow: hidden;
            white-space: nowrap;
        }

        .price {
            background-color: #fff;
            display: flex;
            align-items: baseline;
            justify-content: space-between;
            padding: .5rem;

            .newest-price {
                display: flex;
                white-space: nowrap;
                align-items: baseline;
                color: @priceColor;
                font-size: 1.25rem;

                .period-price {
                    font-size: 1.3rem;
                }
            }

            .default-price {
                font-size: 1.25rem;
                color: @defaultPriceColor;
                text-decoration: line-through;

                .shihang-price {
                    font-size: 1.3rem;
                }
            }
        }

        .add-cart-btn {
            cursor: pointer;
            height: 3rem;
            line-height: 3rem;
            border-radius: 0 0 .5rem .5rem;
            font-size: 1.35rem;
            color: #fff;
            text-align: center;
        }
    }
</style>
