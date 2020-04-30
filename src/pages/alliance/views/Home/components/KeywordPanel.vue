<template>
    <div class="keyword-panel van-hairline--bottom">
        <div class="title">
            <span>搜索记录</span>
            <i class="icon iconfont icon-delete" @click="handleDelete"></i>
        </div>
        <div class="keyword-list">
        <span v-for="item in searchHotList"
              :key="item.Id"
              class="item-box"
              @click="handleKeyWord(item)">{{item}}</span>
            <span class="empty" v-if="searchHotList.length<=0">您还没有搜索记录啊~</span>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import {HISTORY_SEARCH} from '../../../vuex/types'

    export default {
        computed: {
            searchHotList() {
                return this.$store.state.tkTools.historySearch
            }
        },
        methods: {
            handleKeyWord(val) {
                this.$parent.$refs.searchBar.keyword = val
                this.$parent.$refs.searchBar.handleSearch()
            },
            handleDelete() {
                this.$store.commit(HISTORY_SEARCH, null)
            }
        }
    }
</script>

<style lang="less" scoped>
    .keyword-panel {
        background-color: #fff;
        box-sizing: border-box;
        .title {
            display: flex;
            justify-content: space-between;
            align-items: center;
            box-sizing: border-box;
            width: 100%;
            padding: 1.6rem 1.3rem 1.4rem 1.3rem;
            font-size: 1.8rem;
            color: #666;
            font-weight: bold;
            i {
                display: block;
                font-size: 2rem;
                color: #878787;
            }
        }
        .keyword-list {
            display: flex;
            flex-wrap: wrap;
            padding: 0 1.3rem;
            .empty {
                font-size: 1.5rem;
                margin-bottom: 1.2rem;
            }
            .item-box {
                margin-right: 1.2rem;
                margin-bottom: 1.2rem;
                display: inline-block;
                color: #262626;
                padding: .6rem 1.3rem;
                background: #f6f5f5;
                border-radius: .5rem;
                font-size: 1.3rem;
            }
        }
    }
</style>
