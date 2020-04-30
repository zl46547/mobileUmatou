<template>
    <div id="LL-tools">
        <Navigator>
            <span slot="title">联联助手</span>
        </Navigator>
        <div class="content">
            <List
                    v-model="loading"
                    :finished="finished"
                    finished-text="没有更多了"
                    @load="onLoad"
            >
                <ActivityItem
                        :detail="item"
                        v-for="item in table"
                        :key="item.id"
                        @refresh="refresh"
                        @refreshRubbing="refreshRubbing"
                />
            </List>
            <div id="empty" v-if="table.length<=0">
                <i class="iconfont icon-empty-list"></i>
                <div>您的列表空空如也</div>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    /* eslint-disable no-new */

    import Navigator from '../../common/Navigator'
    import ActivityItem from './components/ActivityItem'
    import {List} from 'vant'
    import {getHomeList, getProducts} from './service'

    export default {
        components: {
            ActivityItem,
            List,
            Navigator
        },
        data() {
            return {
                table: [],
                loading: false,
                finished: false,
                pageIndex: 0,
                selected: []
            }
        },
        methods: {
            onLoad() {
                this.initTable()
            },
            /**
             * 初始化表格数据
             */
            async initTable() {
                this.pageIndex += 1
                let selected = []
                if (this.selected.length <= 0) {
                    selected = await getProducts()
                    this.selected = selected.map(item => {
                        return {
                            ...item,
                            checked: true
                        }
                    })
                }
                let {data} = await getHomeList({
                    pageSize: 10,
                    pageIndex: this.pageIndex
                })
                // 加载状态结束
                this.loading = false
                if (this.pageIndex > 1) {
                    this.table = this.table.concat(this.filterHasSelected(data))
                } else {
                    this.table = this.selected.concat(this.filterHasSelected(data))
                }
            },
            refresh(id) {
                let index = this.table.findIndex(item => item.id === id)
                this.$set(this.table, index, {
                    ...this.table[index],
                    checked: !this.table[index].checked,
                    last_modified_time: new Date()
                })
            },
            refreshRubbing(id) {
                let index = this.table.findIndex(item => item.id === id)
                this.$set(this.table, index, {
                    ...this.table[index],
                    last_modified_time: new Date()
                })
            },
            filterHasSelected(list) {
                return list.filter(item => {
                    // 过滤掉没有门市价的商品
                    if (!item.originPriceStr) {
                        return false
                    }
                    // 过滤掉已加入的商品
                    let index = this.selected.findIndex(i => i.id === item.id)
                    return index < 0
                })
            }
        }
    }
</script>

<style lang="less" scoped>
    @import "../../../../less/variables";

    #LL-tools {
        display: flex;
        flex-direction: column;
        height: 100vh;
        overflow: hidden;
        .content {
            margin-top: 80rem/@baseFontSize;
            padding: 0 1rem;
            flex: 1;
            overflow-y: auto;
            #empty {
                text-align: center;
                margin-top: 40%;
                .iconfont {
                    color: #c2c2c2;
                    margin: auto;
                    font-size: 6rem;
                }
                > div {
                    font-size: 1.6rem;
                    white-space: nowrap;
                    padding: 1.5vh;
                    text-align: center;
                }
            }
        }
    }
</style>
