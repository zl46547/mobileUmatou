<template>
    <div id="product-detail">
        <div class="content">
            <!--<Banners :banners="productInfo.small_images.string"/>-->
            <Detail :productInfo="productInfo"/>
        </div>
        <!--<TabMenu-->
        <!--:menuItems="menus"-->
        <!--@menu-selected="menuSelected"-->
        <!--:selected="viewComponent"-->
        <!--/>-->
        <!--<transition name="component-fade" mode="out-in">-->
        <!--<component :is="viewComponent"-->
        <!--:productInfo="productInfo"-->
        <!--:productInfoServices="productInfoServices"-->
        <!--:productActivities="productActivities"-->
        <!--/>-->
        <!--</transition>-->
        <!--&lt;!&ndash; 脚部区域 &ndash;&gt;-->
        <!--<Footer v-if="productInfo.productId"-->
        <!--:productId="productInfo.productId"-->
        <!--/>-->
    </div>
</template>

<script type="text/ecmascript-6">
    // import Footer from './components/Footer.vue'
    // import Banners from './components/Banners'
    import Detail from './components/Detail.vue'
    import {getProductDetail} from './service'

    export default {
        components: {
            // Banners,
            // Footer,
            Detail,
            // RateDetail
        },
        created() {
            this.productInfo = this.$store.state.tkTools.productDetail
        },
        data() {
            return {
                productInfo: {}, // 商品详情
            }
        },
        methods: {
            /**
             * 获取商品详情
             * @param num_iid
             */
            getProductDetailData(num_iid) {
                getProductDetail({numIid: num_iid}).then(res => {
                    console.log(res)
                })
            }
        }
    }
</script>

<style lang="less" scoped>
    #product-detail {
        height: 100%;
        overflow: hidden;
        background-color: #fff;
        display: flex;
        flex-direction: column;
        .content{
            flex: 1;
            overflow-y: auto;
        }
    }
</style>
