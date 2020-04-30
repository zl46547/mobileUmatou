<template>
    <div id="LL-activity">
        <div class="content" ref="contentRef">
            <List
                    :finished="finished"
                    finished-text="没有更多了"
            >
                <ActivityItem
                        :detail="item"
                        :user-type="userType"
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

    import ActivityItem from './components/ActivityItem'
    import {List} from 'vant'
    import {getProducts} from './service'

    export default {
        created() {
            let {userType} = this.$route.query
            this.userType = userType
            this.initTable()
        },
        components: {
            ActivityItem,
            List
        },
        data() {
            return {
                table: [],
                finished: true,
                userType: null
            }
        },
        methods: {
            /**
             * 初始化表格数据
             */
            async initTable() {
                let table = await getProducts()
                this.table = table.map(item => {
                    item.checked = true
                    return item
                })
                this.$nextTick(() => {
                    this.$refs.contentRef.scrollTop = this.$store.state.common.scrollTop
                })
            },
            refresh(id) {
                let index = this.table.findIndex(item => item.id === id)
                this.table[index].checked = !this.table[index].checked
                this.table[index].last_modified_time = new Date()
            },
            refreshRubbing(id) {
                let index = this.table.findIndex(item => item.id === id)
                this.table[index].last_modified_time = new Date()
            }
        }
    }
</script>

<style lang="less" scoped>
    @import "../../../../less/variables";

    #LL-activity {
        display: flex;
        flex-direction: column;
        height: 100vh;
        overflow: hidden;

        .content {
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
