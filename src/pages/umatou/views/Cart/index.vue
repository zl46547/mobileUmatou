<template>
    <div id="cart">
        <Navigator>
            <span slot="title">购物车</span>
        </Navigator>
        <CartList></CartList>
        <TabBar/>
    </div>
</template>

<script type="text/ecmascript-6">
    import Navigator from '../../common/Navigator'
    import CartList from './components/CartList'
    import TabBar from '../../common/TabBar'

    export default {
        components: {
            CartList,
            Navigator,
            TabBar
        }
    }
</script>

<style scoped>
    #cart {
        height: 100vh;
        display: flex;
        flex-direction: column;
        overflow: hidden;
    }
</style>
