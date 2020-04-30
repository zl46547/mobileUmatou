<template>
    <div id="study">
        <h1>好好学习</h1>
        <h1>天天向上</h1>
        <a href="http://www.beian.miit.gov.cn">苏ICP备18071255号-2</a>
    </div>
</template>

<script type="text/ecmascript-6">

    export default {

    }
</script>

<style lang="less" scoped>
    #study {
        height: 100%;
        overflow: hidden;
        color: #000;
        display: flex;
        justify-content: center;
        align-items: center;
        h1 {
            font-size: 5rem;
            width: 8rem;
            &:first-of-type {
                margin-top: -7rem;
            }
            &:last-of-type {
                margin-top: 7rem;
            }
        }
        a {
            font-size: 2rem;
            position: fixed;
            bottom: 10px;
            right: 10px;
            color: blue;
            text-decoration: underline;
        }
    }
</style>
