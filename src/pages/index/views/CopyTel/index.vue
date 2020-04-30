<template>
    <div id="copy-tel">
        <p>执行 {{count}} 次</p>
        <Button type="primary" @click="handleCopyCode()">复制口令</Button>
    </div>
</template>

<script type="text/ecmascript-6">

    import {Button, Toast} from 'vant'
    import copy from 'copy-to-clipboard'

    export default {
        data() {
            return {
                telList: ['15195678494', '18068074370','18015506177'],
                index: 0,
                count: 0

            }
        },
        components: {
            Button
        },
        methods: {
            /**
             * 复制
             */
            handleCopyCode() {
                this.count += 1
                copy(this.telList[this.index])
                Toast.success('复制成功！')
                if (this.index >= this.telList.length - 1) {
                    this.index = 0
                } else {
                    this.index += 1
                }
            }
        }
    }
</script>

<style lang="less" scoped>
    #copy-tel {
        height: 100%;
        overflow: hidden;
        color: #000;
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>
